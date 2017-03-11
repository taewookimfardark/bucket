import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogicMiddleware} from 'redux-logic';


import * as NavigationReducers from '../general/navigation/NavigationReducers';
import modalReducer from '../general/modal/modalReducer';
import {authReducer} from '../auth/authReducer';
import {userReducer} from '../user/userReducer';
import {imageReducer} from '../image/imageReducer';
import {groupReducer} from '../group/groupReducer';
import {bucketReducer} from '../bucket/bucketReducer';

import http from '../services/http';
import fetch from '../services/fetch';

import userLogics from '../user/userLogics';
import authLogics from '../auth/authLogics';
import imageLogics from '../image/imageLogics';
import groupLogics from '../group/groupLogics';
import bucketLogics from '../bucket/bucketLogics';

const deps = {
  http, fetch
};

const logicMiddleware = createLogicMiddleware([
  ...authLogics, ...userLogics, ...imageLogics, ...groupLogics, ...bucketLogics
], deps);

const middleware = applyMiddleware(
  logicMiddleware
);

const enhancer = middleware;

const store = createStore(
  combineReducers({
    auth: authReducer,
    user: userReducer,
    image: imageReducer,
    group: groupReducer,
    bucket: bucketReducer,
    navigation: NavigationReducers.navigationState,
    modal: modalReducer
  }), enhancer
);

export default store