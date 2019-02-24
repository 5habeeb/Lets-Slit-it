import React from 'react';
import Search from './Search';
import AddExpensePage from './AddExpensePage';
import { ExpensesList } from './ExpensesList';
import ExpensesListFilters from './ExpenseListFilters';
import { connect } from 'react-redux';
import { startSetExpenses } from '../actions/expenses';
import selectExpenses from '../selectors/Expenses';
import BalancePage from './BalancePage';

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

  viewSearch = () => {
    this.setState({
      contentToRender: 0
    });
  };

  viewAdd = () => {
    this.setState({
      contentToRender: 1
    });
  };

  viewBalances = () => {
    this.setState({
      contentToRender: 2
    });
  };

  getGroupMembers = groups => {
    return groups.filter(group => group.id == this.state.groupid)[0].members;
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

  render() {
    return (
      <div className="content-container">
        <div>
          <button onClick={this.viewSearch}>Search payments</button>
          <button onClick={this.viewBalances}>Balances</button>
          <button onClick={this.viewAdd}>Add payment</button>
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
