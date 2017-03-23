import {createLogic} from 'redux-logic';
import {userActions, userActionCreators} from './userReducer';

const userLogic = createLogic({
  type: userActions.GET_USERS,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try {
      let res = await fetch.send('/users', 'get');
      const users = res.data;
      dispatch(userActionCreators.setUsers(users));
    } catch(err) {
      console.log(err);
    }
  }
});

export default [
  userLogic
]