const groupssReducerDefaultSate = [];

export default (state = groupssReducerDefaultSate, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      //return state.concat(action.expense);
      return [...state, action.group];
    case 'REMOVE_GROUP':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_GROUP':
      return state.map(group => {
        if (group.id === action.id) {
          return {
            ...group,
            ...action.updates
          };
        } else {
          return group;
        }
      });
    case 'SET_GROUPS':
      return action.groups;
    default:
      return state;
  }
};
