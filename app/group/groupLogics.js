import {createLogic} from 'redux-logic';
import {groupActions, groupActionCreators} from './groupReducer';
import {imageActionCreators} from '../image/imageReducer';
import {Actions} from 'react-native-router-flux';

const postGroupLogic = createLogic({
  type: groupActions.POST_GROUP,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      console.log(action);
      let res = await fetch.send('/groups', 'post', action.group);
      console.log(res);
      if(res.data) dispatch(groupActionCreators.setGroup([res.data.group]));
      dispatch(imageActionCreators.setImage(null));
      Actions.group();

    } catch(err) {
      console.log(err);
    }
  }
});

const getGroupLogic = createLogic({
  type: groupActions.GET_GROUP,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    console.log('call');
    let res = await fetch.send('/relation-user-groups', 'get');
    console.log('hoho', res);
    if(!res.data) done();
    let groups = [];
    for(let relationUserGroup of res.data) {
      groups.push(relationUserGroup.group);
    }
    dispatch(groupActionCreators.setGroup(groups));
  }
});

export default [
  postGroupLogic, getGroupLogic
]