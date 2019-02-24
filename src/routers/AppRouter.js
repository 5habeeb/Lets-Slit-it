import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import DisplayGroupPage from '../components/DisplayGroupPage';
import PaymentsPage from '../components/PaymentsPage';
import BalancePage from '../components/BalancePage';
import AddPaymentPage from '../components/AddPaymentPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import EditExpensePage from '../components/EditExpense';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/payments" component={PaymentsPage} />
        <PrivateRoute path="/group/:id" component={DisplayGroupPage} />
        <PrivateRoute path="/edit/:gid/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
