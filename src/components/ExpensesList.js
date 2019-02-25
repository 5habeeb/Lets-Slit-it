import React from 'react';
import { connect } from 'react-redux';
import ExpensesListItem from './ExpensesListItem';
import selectExpenses from '../selectors/Expenses';

export const ExpensesList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobil">Expenses</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {console.log(props.expenses.length)}
      {props.expenses.length === 0 ? (
        <div className="list-item--message">
          <span>No Expenses</span>
        </div>
      ) : (
        props.expenses.map(expense => (
          <ExpensesListItem
            key={expense.id}
            {...expense}
            members={props.members}
            groupId={props.groupId}
          />
        ))
      )}
    </div>
  </div>
);

export default ExpensesList;
