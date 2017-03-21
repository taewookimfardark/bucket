export const bucketImageActions = {
  POST_BUCKET_IMAGE: 'POST_BUCKET_IMAGE',
  SET_BUCKET_IMAGE: 'SET_BUCKET_IMAGE',
  GET_BUCKET_IMAGE: 'GET_BUCKET_IMAGE'
};

export const bucketImageActionCreators = {
  postBucketImage: (bucketId, imageArr) => ({type: bucketImageActions.POST_BUCKET_IMAGE, bucketId, imageArr}),
  setBucketImage: (imageArr) => ({type: bucketImageActions.SET_BUCKET_IMAGE, imageArr}),
  getBucketImage: (bucketId) => ({type: bucketImageActions.GET_BUCKET_IMAGE, bucketId})
};

export const bucketImageReducer = (state={}, action) => {
  switch(action.type) {
    case bucketImageActions.SET_BUCKET_IMAGE:
      let newState = {...state};
      for(let img of action.imageArr) {
        newState[img.id] = img;
      }
      return newState;
    default:
      return state;
  }
};