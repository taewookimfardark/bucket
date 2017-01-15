import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogicMiddleware} from 'redux-logic';

import * as NavigationReducers from '../general/navigation/NavigationReducers';
import modalReducer from '../general/modal/modalReducer';

const store = createStore(
  combineReducers({
    navigation: NavigationReducers.navigationState,
    modal: modalReducer
  })
);

export default store