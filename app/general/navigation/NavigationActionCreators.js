import * as NavigationActions from './NavigationActions';

export function push(route) {
  return {
    type: NavigationActions.PUSH_ROUTE,
    route
  }
}

export function pop(route) {
  return {
    type: NavigationActions.POP_ROUTE,
    route
  }
}

export function changeTab(index) {
  return {
    type: NavigationActions.CHANGE_TAB,
    index
  }
}