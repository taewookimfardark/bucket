export const authActions = {
  LOGIN: 'LOGIN',
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  DELETE_AUTH_TOKEN: 'DELETE_AUTH_TOKEN',
  SET_MY_DATA: 'SET_MY_DATA'
};

export const authActionCreators = {
  login: (email, password) => ({type: authActions.LOGIN, email, password}),
  setAuthToken: (token) => ({type: authActions.SET_AUTH_TOKEN, token}),
  deleteAuthToken: () => ({type: authActions.DELETE_AUTH_TOKEN}),
  setMyData: (myData) => ({type: authActions.SET_MY_DATA, myData})
};

export const authReducer = (state = {}, action) => {
  switch(action.type) {
    case authActions.SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case authActions.DELETE_AUTH_TOKEN:
      return {
        ...state,
        token: null
      };
    case authActions.SET_MY_DATA:
      return {
        ...state,
        myData: {...state.myData, ...action.myData}
      };
    default:
      return state;
  }
};