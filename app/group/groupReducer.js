export const groupActions = {
  POST_GROUP: 'POST_GROUP',
  SET_GROUP: 'SET_GROUP',
  GET_GROUP: 'GET_GROUP',
  GET_GROUP_MEMBERS: 'GET_GROUP_MEMBERS',
  ADD_GROUP_MEMBERS: 'ADD_GROUP_MEMBERS',
  SET_GROUP_MEMBERS: 'SET_GROUP_MEMBERS',
  RESET_GROUP: 'RESET_GROUP'
};

export const groupActionCreators = {
  postGroup: (group) => ({type: groupActions.POST_GROUP, group}),
  setGroup: (groups) => ({type: groupActions.SET_GROUP, groups}),
  getGroup: (query) => ({type: groupActions.GET_GROUP, query}),
  getGroupMembers: (groupId) => ({type: groupActions.GET_GROUP_MEMBERS, groupId}),
  addGroupMembers: (member) => ({type: groupActions.ADD_GROUP_MEMBERS, member}),
  setGroupMembers: (groupId, members) => ({type: groupActions.SET_GROUP_MEMBERS, groupId, members}),
  resetGroup: ()=> ({type: groupActions.RESET_GROUP})
};

export const groupReducer = (state={}, action) => {
  switch(action.type) {
    case groupActions.SET_GROUP:
      let groupObj = {};
      for(let group of action.groups) {
        groupObj[group.id] = group;
      }
      return {
        ...state,
        ...groupObj
      };

    case groupActions.SET_GROUP_MEMBERS:
      let group = state[action.groupId];
      if(!group.members) group.members = [];
      group.members = [...group.members, ...action.members];
      return {
        ...state,
        [action.groupId]: group
      };

    case groupActions.RESET_GROUP:
      return {};
    default:
      return state;
  }
};