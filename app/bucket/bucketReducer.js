export const bucketActions = {
  GET_BUCKET: 'GET_BUCKET',
  SET_BUCKET: 'SET_BUCKET',
  POST_BUCKET: 'POST_BUCKET'
};

export const bucketActionCreators = {
  getBucket: (groupId) => ({type: bucketActions.GET_BUCKET, groupId}),
  setBucket: (bucketList) => ({type: bucketActions.SET_BUCKET, bucketList}),
  postBucket: (bucket) => ({type: bucketActions.POST_BUCKET, bucket})
};

export const bucketReducer = (state={}, action) => {
  switch(action.type) {
    case bucketActions.SET_BUCKET:
      let bucketList = action.bucketList;
      let bucketObj = {};
      for(let bucket of bucketList) {
        bucketObj[bucket.id] = bucket;
      }
      console.log('new bucekt reducer', {
        ...state,
        ...bucketObj
      });
      return {
        ...state,
        ...bucketObj
      };
    default:
      return state;
  }
};
