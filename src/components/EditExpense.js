import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {
  startEditExpense,
  startRemoveExpense,
  startSetExpenses
} from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    const groupId = this.props.match.params.gid;
    const expenseId = this.props.match.params.id;
    this.props.startEditExpense(expenseId, expense, groupId);
    this.props.history.push(`/group/${groupId}`);
  };

  handelClick = e => {
    const groupId = this.props.match.params.gid;
    const expenseId = this.props.match.params.id;
    this.props.startRemoveExpense({ id: expenseId }, groupId);
    this.props.history.push(`/group/${groupId}`);
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Payment</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--remove" onClick={this.handelClick}>
            {' '}
            Remove Payment
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => props.match.params.id === expense.id
    )
  };
};

const mapDispatchTpProps = dispatch => ({
  startEditExpense: (id, expense, groupId) =>
    dispatch(startEditExpense(id, expense, groupId)),
  startRemoveExpense: (data, groupId) =>
    dispatch(startRemoveExpense(data, groupId)),
  startSetExpenses: groupId => dispatch(startSetExpenses(groupId))
});

export default connect(
  mapStateToProps,
  mapDispatchTpProps
)(EditExpensePage);
