import React from 'react';
import Search from './Search';
import AddExpensePage from './AddExpensePage';
import { ExpensesList } from './ExpensesList';
import ExpensesListFilters from './ExpenseListFilters';
import { connect } from 'react-redux';
import { startSetExpenses } from '../actions/expenses';
import selectExpenses from '../selectors/Expenses';

class DisplayGroupPage extends React.Component {
  state = {
    searchPageIsActive: true,
    groupid: window.location.pathname.replace('/group/', '')
  };

  componentWillMount() {
    this.props.startSetExpenses(this.state.groupid);
  }

  viewSearch = () => {
    this.setState({
      searchPageIsActive: true
    });
  };

  viewAdd = () => {
    this.setState({
      searchPageIsActive: false
    });
  };

  getGroupMembers = groups => {
    return groups.filter(group => group.id == this.state.groupid)[0].members;
  };

  render() {
    const groupId = window.location.pathname.replace('/group/', '');
    let expenses = this.props.expenses;

    let members = this.getGroupMembers(this.props.groups);

    return (
      <div className="content-container">
        <div>
          <button onClick={this.viewSearch}>Search payments</button>
          <button onClick={this.viewAdd}>Add payment</button>
        </div>
        {this.state.searchPageIsActive ? (
          <div>
            <ExpensesListFilters />
            <ExpensesList expenses={expenses} members={members} />
          </div>
        ) : (
          <AddExpensePage viewSearch={this.viewSearch} groupId={groupId} />
        )}
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
