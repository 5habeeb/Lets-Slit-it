import database from '../firebase/firebase';

export const setUsers = users => ({
  type: 'SET_USERS',
  users
});

export const startSetUsers = () => {
  return (dispatch, getState) => {
    return database
      .ref('users')
      .once('value')
      .then(snapshot => {
        const users = [];

        snapshot.forEach(childSnapshot => {
          users.push(childSnapshot.val());
        });
        dispatch(setUsers(users));
      });
  };
};
