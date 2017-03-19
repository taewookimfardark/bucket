export const bucketImageActions = {
  POST_BUCKET_IMAGE: 'POST_BUCKET_IMAGE',
  SET_BUCKET_IMAGE: 'SET_BUCKET_IMAGE'
};

export const bucketImageActionCreators = {
  postBucketImage: (bucketId, body) => ({type: bucketImageActions.POST_BUCKET_IMAGE, bucketId, body}),
  setBucketImage: (image) => ({type: bucketImageActions.SET_BUCKET_IMAGE, image})
};

export const bucketImageReducer = (state={}, action) => {
  switch(action.type) {
    case bucketImageActions.SET_BUCKET_IMAGE:
      return {
        ...state,
        [action.image.id]: action.image
      };
    default:
      return state;
  }
};