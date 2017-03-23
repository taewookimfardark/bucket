import {createLogic} from 'redux-logic';
import {bucketActions, bucketActionCreators} from './bucketReducer';
import {imageActionCreators} from '../image/imageReducer';

import {Actions} from 'react-native-router-flux';

const getBucketLogic = createLogic({
  type: bucketActions.GET_BUCKET,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      let res = await fetch.send('/buckets', 'get', null, {groupId: action.groupId});
      let groupList = res.data;
      dispatch(bucketActionCreators.setBucket(groupList));
    } catch(err) {
      console.log('err', err);
    }
  }
});

const postBucketLogic = createLogic({
  type: bucketActions.POST_BUCKET,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      let res = await fetch.send('/buckets', 'post', action.bucket);

      const state = getState();

      let createdBucket = res.data;
      createdBucket.user = {
        profileImage: state.auth.myData.profileImage,
        profileImageId: state.auth.myData.profileImageId
      };

      dispatch(bucketActionCreators.setBucket([createdBucket]));
      dispatch(imageActionCreators.setImage(null));

      Actions.home();

    } catch(err) {
      console.log('error', err);
    }
  }
});

const updateBucketLogic = createLogic({
  type: bucketActions.UPDATE_BUCKET,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      let res = await fetch.send(`/buckets/${action.bucketId}`, 'put', action.params);
      let bucket = res.data;
      let params = {};
      for(let param in action.params) {
        params[param] = bucket[param];
      }
      dispatch(bucketActionCreators.upsertBucket(bucket.id, params));
      Actions.pop();
    } catch(err){
      console.log(err);
    }
  }
});

export default [
  getBucketLogic,
  postBucketLogic,
  updateBucketLogic
]