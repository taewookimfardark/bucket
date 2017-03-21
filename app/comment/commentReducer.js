export const commentActions = {
  GET_COMMENT: 'GET_COMMENT',
  POST_COMMENT: 'POST_COMMENT',
  SET_COMMENT: 'SET_COMMENT'
};

export const commentActionCreators = {
  getComment: (bucketId) => ({type: commentActions.GET_COMMENT, bucketId}),
  postComment: (comment) => ({type: commentActions.POST_COMMENT, comment}),
  setComment: (comment) => ({type: commentActions.SET_COMMENT, comment})
};

export const commentReducer = (state={}, action) => {
  switch(action.type) {
    case commentActions.SET_COMMENT:
      let commentList = action.comment;
      let commentObj = {};
      for(let comment of commentList){
        commentObj[comment.id] = comment;
      }
      return {
        ...state,
        ...commentObj
      };
    default:
      return state;
  }
};
