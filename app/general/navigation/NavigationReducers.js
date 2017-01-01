import * as NavigationActions from './NavigationActions';
import {NavigationExperimental} from 'react-native';

const { StateUtils: NavigationStateUtils} = NavigationExperimental;

const initialRoute = {
  index: 0,
  key: 'root',
  routes: [
    {
      key: 'login',
      title: 'login'
    }
  ]
};

export const navigationState = (state = initialRoute, action)=> {
  switch(action.type) {

    case NavigationActions.PUSH_ROUTE:
      if(state.routes[state.index].key === (action.route && action.route.key)) return state;
      return NavigationStateUtils.push(state, action.route);

    case NavigationActions.POP_ROUTE:
      if(state.index === 0 || state.routes.length === 1) return state;
      return NavigationStateUtils.pop(state);

    default:
      return state;
  }
};

const tabs = [
  { key: 'home', title: 'Home' },
  { key: 'register', title: 'Register' },
  { key: 'profile', title: 'Profile' }
]; // 나중에 아이콘 추가

const initialTab = {
  index: 0,
  tabs: tabs
};

export const tabState = (state = initialTab, action) => {
  if(action.index == state.index) return state;
  switch(action.type) {

    case NavigationActions.CHANGE_TAB:
      return {
        ...state,
        index: action.index
      };

    default:
      return state;
  }
};