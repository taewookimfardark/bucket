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
    let res = await fetch.send('/relation-user-groups', 'get', null, action.query);
    if(!res.data) done();
    let groups = [];
    for(let relationUserGroup of res.data) {
      groups.push(relationUserGroup.group);
    }
    dispatch(groupActionCreators.setGroup(groups));
  }
});

const getGroupMembersLogic = createLogic({
  type: groupActions.GET_GROUP_MEMBERS,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    let res = await fetch.send(`/members/${action.groupId}`, 'get');
    let members = res.data;
    dispatch(groupActionCreators.setGroupMembers(action.groupId, members));
    done();
  }
});

const addGroupMembersLogic = createLogic({
  type: groupActions.ADD_GROUP_MEMBERS,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    let res = await fetch.send('/relation-user-groups', 'post', action.member);
    let member = res.data.user;
    dispatch(groupActionCreators.setGroupMembers(action.member.groupId, [member]));
  }
});

export default [
  postGroupLogic, getGroupLogic, getGroupMembersLogic, addGroupMembersLogic
]