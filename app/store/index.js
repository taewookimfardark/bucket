import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogicMiddleware} from 'redux-logic';


import * as NavigationReducers from '../general/navigation/NavigationReducers';
import modalReducer from '../general/modal/modalReducer';
import {authReducer} from '../auth/authReducer';
import {userReducer} from '../user/userReducer';
import {imageReducer} from '../image/imageReducer';
import {groupReducer} from '../group/groupReducer';
import {bucketReducer} from '../bucket/bucketReducer';
import {bucketImageReducer} from '../bucket-image/bucketImageReducer';
import {commentReducer} from '../comment/commentReducer';

import http from '../services/http';
import fetch from '../services/fetch';

import userLogics from '../user/userLogics';
import authLogics from '../auth/authLogics';
import imageLogics from '../image/imageLogics';
import groupLogics from '../group/groupLogics';
import bucketLogics from '../bucket/bucketLogics';
import bucketImageLogics from '../bucket-image/bucketImageLogics';
import commentLogics from '../comment/commentLogics';

const deps = {
  http, fetch
};

const logicMiddleware = createLogicMiddleware([
  ...authLogics, ...userLogics, ...imageLogics, ...groupLogics, ...bucketLogics, ...bucketImageLogics, ...commentLogics
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
    bucketImage: bucketImageReducer,
    navigation: NavigationReducers.navigationState,
    comment: commentReducer,
    modal: modalReducer
  }), enhancer
);

export default store