import React from 'react';
import Search from './Search';
import AddExpensePage from './AddExpensePage';
import { ExpensesList } from './ExpensesList';
import ExpensesListFilters from './ExpenseListFilters';
import { connect } from 'react-redux';
import { startSetExpenses } from '../actions/expenses';
import selectExpenses from '../selectors/Expenses';
import BalancePage from './BalancePage';
import { Link } from 'react-router-dom';

class DisplayGroupPage extends React.Component {
  state = {
    contentToRender: 0,
    groupid: window.location.pathname.replace('/group/', '')
  };

  componentWillMount() {
    this.props.startSetExpenses(this.state.groupid);
  }

  componentDidMount() {
    this.render();
  }

  removeSelectClass = () => {
    document.getElementById('search').classList.remove('select-btn');
    document.getElementById('balances').classList.remove('select-btn');
    document.getElementById('add').classList.remove('select-btn');
  };

  selectBtn = id => {
    this.removeSelectClass();
    document.getElementById(id).classList.add('select-btn');
  };

  viewSearch = () => {
    this.selectBtn('search');
    this.setState({
      contentToRender: 0
    });
  };

  viewAdd = () => {
    this.selectBtn('add');
    this.setState({
      contentToRender: 1
    });
  };

  viewBalances = () => {
    this.selectBtn('balances');
    this.setState({
      contentToRender: 2
    });
  };

  getGroupMembers = groups => {
    return groups.filter(group => group.id == this.state.groupid)[0].members;
  };

  getGroupName = groups => {
    return groups.filter(group => group.id == this.state.groupid)[0].name;
  };

  renderContent = () => {
    const groupId = this.props.match.params.id;
    let expenses = this.props.expenses;
    let members = this.getGroupMembers(this.props.groups);

    let contentToRender = this.state.contentToRender;
    if (contentToRender === 0) {
      return (
        <div>
          <ExpensesListFilters />
          <ExpensesList
            expenses={expenses}
            members={members}
            groupId={groupId}
          />
        </div>
      );
    } else if (contentToRender === 1) {
      return <AddExpensePage viewSearch={this.viewSearch} groupId={groupId} />;
    } else if (contentToRender === 2) {
      return (
        <BalancePage expenses={expenses} members={members}>
          Balances
        </BalancePage>
      );
    }
  };

  handleBack() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="content-container">
        <div className="group-header-container">
          <Link className="Back-link" to="/dashboard">
            &#x2190; Back to groups
          </Link>
          <h3>{this.getGroupName(this.props.groups)}</h3>
        </div>
        <div className="header-menu-container">
          <button
            className="button-menu-header button-border-right select-btn button-third-size"
            onClick={this.viewSearch}
            id="search"
          >
            Payments
          </button>
          <button
            className="button-menu-header button-border-right button-third-size"
            onClick={this.viewBalances}
            id="balances"
          >
            Balances
          </button>
          <button
            className="button-menu-header button-third-size"
            onClick={this.viewAdd}
            id="add"
          >
            Add payment
          </button>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    groups: state.groups
  };
};

const mapDispatchToProps = dispatch => ({
  startSetExpenses: groupId => dispatch(startSetExpenses(groupId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayGroupPage);
