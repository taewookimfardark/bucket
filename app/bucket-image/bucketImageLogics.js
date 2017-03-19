import {createLogic} from 'redux-logic';
import {bucketImageActions, bucketImageActionCreators} from './bucketImageReducer';

const bucketImageLogic = createLogic({
  type: bucketImageActions.POST_BUCKET_IMAGE,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      console.log('gogo');
      let res = await fetch.send('/bucket_images', 'post', action.body, {bucketId: action.bucketId}, {'Content-Type': 'multipart/form-data'});
      console.log('bucket image res', res);
      dispatch(bucketImageActionCreators.setBucketImage(res.data));
    } catch(err) {
      console.log('error', err);
    }
  }
});

export default [
  bucketImageLogic
]