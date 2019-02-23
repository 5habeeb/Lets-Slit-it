import database from '../firebase/firebase';

export const addGroup = group => ({
  type: 'ADD_GROUP',
  group
});

export const startAddGroup = (groupData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { name = '', createdAt = 0, members = [uid] } = groupData;

    const group = { name, createdAt, members };
    console.log(group);

    return database
      .ref(`groups`)
      .push(group)
      .then(ref => {
        dispatch(
          addGroup({
            id: ref.key,
            ...group
          })
        );
      });
  };
};

export const setGroups = groups => ({
  type: 'SET_GROUPS',
  groups
});

export const startSetGroups = () => {
  return (dispatch, getState) => {
    return database
      .ref(`groups`)
      .once('value')
      .then(snapshot => {
        const groups = [];

        snapshot.forEach(childSnapshot => {
          groups.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setGroups(groups));
      });
  };
};
