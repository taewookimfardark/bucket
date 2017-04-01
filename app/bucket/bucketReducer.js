export const bucketActions = {
  GET_BUCKET: 'GET_BUCKET',
  SET_BUCKET: 'SET_BUCKET',
  POST_BUCKET: 'POST_BUCKET',
  UPDATE_BUCKET: 'UPDATE_BUCKET',
  UPSERT_BUCKET: 'UPSERT_BUCKET',
  RESET_BUCKET: 'RESET_BUCKET'
};

export const bucketActionCreators = {
  getBucket: (groupId) => ({type: bucketActions.GET_BUCKET, groupId}),
  setBucket: (bucketList) => ({type: bucketActions.SET_BUCKET, bucketList}),
  postBucket: (bucket) => ({type: bucketActions.POST_BUCKET, bucket}),
  updateBucket: (bucketId, params, updateType) => ({type: bucketActions.UPDATE_BUCKET, bucketId, params, updateType}),
  upsertBucket: (bucketId, params) => ({type: bucketActions.UPSERT_BUCKET, bucketId, params}),
  resetBucket: ()=> ({type: bucketActions.RESET_BUCKET})
};

export const bucketReducer = (state={}, action) => {
  switch(action.type) {
    case bucketActions.SET_BUCKET:
      let bucketList = action.bucketList;
      let bucketObj = {};
      for(let bucket of bucketList) {
        bucketObj[bucket.id] = bucket;
      }
      return {
        ...state,
        ...bucketObj
      };
    case bucketActions.UPSERT_BUCKET:
      let bucket = {...state[action.bucketId]};
      for(let param in action.params) {
        bucket[param] = action.params[param];
      }
      return {
        ...state,
        [action.bucketId]: bucket
      };
    case bucketActions.RESET_BUCKET:
      return {};
    default:
      return state;
  }
};
