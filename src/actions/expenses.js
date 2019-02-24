import database from '../firebase/firebase';

export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const { groupId } = expenseData;
    console.log(groupId);
    const payerId = getState().auth.uid;
    const expense = { description, note, amount, createdAt, payerId };
    return database
      .ref(`groups/${groupId}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
        dispatch(startSetExpenses(groupId));
      });
  };
};

export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id }, groupId) => {
  console.log(`users/${groupId}/expenses/${id}`);
  return (dispatch, getState) => {
    return database
      .ref(`groups/${groupId}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates, groupId) => {
  return (dispatch, getState) => {
    return database
      .ref(`groups/${groupId}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = groupId => {
  return (dispatch, getState) => {
    return database
      .ref(`groups/${groupId}/expenses`)
      .once('value')
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
