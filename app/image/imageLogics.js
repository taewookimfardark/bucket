import {createLogic} from 'redux-logic';
import {imageActions, imageActionCreators} from './imageReducer';

const imageLogic = createLogic({
  type: imageActions.POST_IMAGE,
  latest: true,
  process: async({getState, action, http, fetch}, dispatch, done) => {
    try{
      let res = await fetch.send('/images', 'post', action.body, null, {'Content-Type': 'multipart/form-data'});
      console.log(res);
      dispatch(imageActionCreators.setImage(res.data));
    } catch(err) {
      console.log('error', err);
    }
  }
});

export default [
  imageLogic
]