import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogicMiddleware} from 'redux-logic';

import * as NavigationReducers from '../general/navigation/NavigationReducers';

const store = createStore(
  combineReducers({
    navigation: NavigationReducers.navigationState
  })
);

export default store