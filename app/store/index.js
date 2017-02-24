import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogicMiddleware} from 'redux-logic';

import * as NavigationReducers from '../general/navigation/NavigationReducers';
import modalReducer from '../general/modal/modalReducer';
import {authReducer} from '../auth/authReducer';
import http from '../services/http';

import authLogics from '../auth/authLogics';

const deps = {
  http
};

const logicMiddleware = createLogicMiddleware([
  ...authLogics
], deps);

const middleware = applyMiddleware(
  logicMiddleware
);

const enhancer = middleware;

const store = createStore(
  combineReducers({
    auth: authReducer,
    navigation: NavigationReducers.navigationState,
    modal: modalReducer
  }), enhancer
);

export default store