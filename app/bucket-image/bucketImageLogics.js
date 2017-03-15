import {createLogic} from 'redux-logic';
import {bucketImageActions, bucketImageActionCreators} from './bucketImageReducer';

const bucketImageLogic = createLogic({
  type: bucketImageActions.POST_BUCKET_IMAGE,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      let res = await fetch.send('/bucket_images', 'post', action.body, null, {'Content-Type': 'multipart/form-data'});
      dispatch(bucketImageActionCreators.setBucketImage(res.data));
    } catch(err) {
      console.log('error', err);
    }
  }
});

export default [
  bucketImageLogic
]