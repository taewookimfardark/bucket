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
      console.log(action);
      let tmpUsers = {};
      for(let user of action.users) {
        tmpUsers[user.id] = user;
      }
      return {
        ...state,
        users: {
          ...state.users,
          ...tmpUsers
        }
      };
    default:
      return state;
  }
};