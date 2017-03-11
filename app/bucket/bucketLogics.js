import {createLogic} from 'redux-logic';
import {bucketActions, bucketActionCreators} from './bucketReducer';

import {Actions} from 'react-native-router-flux';

const getBucketLogic = createLogic({
  type: bucketActions.GET_BUCKET,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      let res = await fetch.send('/buckets', 'get', null, {groupId: action.groupId});
      console.log('get bucket', res);
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
      console.log(action);
      let res = await fetch.send('/buckets', 'post', action.bucket);

      dispatch(bucketActionCreators.setBucket([res.data]));
      Actions.home();

    } catch(err) {
      console.log('error', err);
    }
  }
});

export default [
  getBucketLogic,
  postBucketLogic
]