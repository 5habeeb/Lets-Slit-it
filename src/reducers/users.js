const usersssReducerDefaultSate = [];

export default (state = usersssReducerDefaultSate, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.users;
    default:
      return state;
  }
};