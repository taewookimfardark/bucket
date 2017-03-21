import {createLogic} from 'redux-logic';
import {commentActions, commentActionCreators} from './commentReducer';

const getCommentLogic = createLogic({
  type: commentActions.GET_COMMENT,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try {
      let res = await fetch.send('/comments', 'get', null, {bucketId: action.bucketId});
      let commentList = res.data;
      dispatch(commentActionCreators.setComment(commentList));
    } catch(err) {
      console.log('error', err);
    }
  }
});

const postCommentLogic = createLogic({
  type: commentActions.POST_COMMENT,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try {
      let res = await fetch.send('/comments', 'post', action.comment);
      let comment = res.data;
      dispatch(commentActionCreators.setComment([comment]));
    } catch(err) {
      console.log('error', err);
    }
  }
});

export default [getCommentLogic, postCommentLogic]