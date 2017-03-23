export const userActions = {
  GET_USERS: 'GET_USERS',
  SET_USERS: 'SET_USERS'
};

export const userActionCreators = {
  getUsers: () => ({type: userActions.GET_USERS}),
  setUsers: (users) => ({type: userActions.SET_USERS, users})
};

export const userReducer = (state = {}, action) => {
  switch(action.type) {
    case userActions.SET_USERS:
      let newState = {...state};
      for(let user of action.users) {
        newState[user.id] = user;
      }
      return newState;
    default:
      return state;
  }
};