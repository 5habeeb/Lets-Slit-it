import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import database from '../src/firebase/firebase';
import { startSetGroups } from './actions/groups';
import { startSetUsers } from './actions/users';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

const addUserToDatabase = googleUser => {
  let users;
  const user = {
    uid: googleUser.uid,
    displayName: googleUser.displayName
  };

  database
    .ref('users')
    .once('value')
    .then(snapshot => {
      users = snapshot.val();

      if (users == null) {
        users = [{ uid: user.uid, displayName: user.displayName }];
        database.ref('users').set(users);
      } else {
        let userExists = false;
        users.map(element => {
          if (element.uid == user.uid) {
            userExists = true;
          }
        });

        if (!userExists) {
          users = [...users, user];
          database.ref('users').set(users);
        }
      }
    });
  /*if (!(users.indexOf(uid) > -1)) {
    database.ref(`users`).push(uid);
  }*/
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    addUserToDatabase(user);
    store.dispatch(login(user.uid));
    store.dispatch(startSetUsers());
    store.dispatch(startSetGroups()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
