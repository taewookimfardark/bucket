import {createLogic} from 'redux-logic';
import {bucketImageActions, bucketImageActionCreators} from './bucketImageReducer';

const postBucketImageLogic = createLogic({
  type: bucketImageActions.POST_BUCKET_IMAGE,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      let res = await fetch.send('/bucket-images', 'post', action.imageBody, {bucketId: action.bucketId}, {'Content-Type': 'multipart/form-data'});
      console.log(res);
      console.log(res.data);
      dispatch(bucketImageActionCreators.setBucketImage(res.data));
    } catch(err) {
      console.log('error', err);
    }
  }
});

const getBucketImageLogic = createLogic({
  type: bucketImageActions.GET_BUCKET_IMAGE,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      console.log('getget');
      let res = await fetch.send('/bucket-images', 'get', null, {bucketId: action.bucketId});
      console.log(res);
      dispatch(bucketImageActionCreators.setBucketImage(res.data));
    } catch(err) {
      console.log('error', err);
    }
  }
});

export default [
  postBucketImageLogic, getBucketImageLogic
]