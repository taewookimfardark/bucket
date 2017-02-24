import {createLogic} from 'redux-logic';
import {authActions, authActionCreators} from './authReducer';

import {Actions} from 'react-native-router-flux';


const loginLogic = createLogic({
  type: authActions.LOGIN,
  latest: true,
  process: async({getState, action, http}, dispatch, done) => {

    try {
      let res = await http.post('/login', {email: action.email, password: action.password});

      let token = res.data.token;
      let myData = res.data.data;

      dispatch(authActionCreators.setAuthToken(token));
      dispatch(authActionCreators.setMyData(myData));

      Actions.group();

    } catch(err) {
      console.log(err);
    }
  }
});

export default [
  loginLogic
]