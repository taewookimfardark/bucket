export const groupActions = {
  POST_GROUP: 'POST_GROUP',
  SET_GROUP: 'SET_GROUP',
  GET_GROUP: 'GET_GROUP',
  RESET_GROUP: 'RESET_GROUP'
};

export const groupActionCreators = {
  postGroup: (group) => ({type: groupActions.POST_GROUP, group}),
  setGroup: (groups) => ({type: groupActions.SET_GROUP, groups}),
  getGroup: () => ({type: groupActions.GET_GROUP}),
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
    case groupActions.RESET_GROUP:
      return {};
    default:
      return state;
  }
};