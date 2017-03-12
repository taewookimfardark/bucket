export const imageActions = {
  POST_IMAGE: 'POST_IMAGE',
  GET_IMAGE: 'GET_IMAGE',
  SET_IMAGE: 'SET_IMAGE',
};

export const imageActionCreators = {
  postImage: (body) => ({type: imageActions.POST_IMAGE, body}),
  setImage: (image) => ({type: imageActions.SET_IMAGE, image})
};

export const imageReducer = (state={}, action) => {
  switch(action.type) {
    case imageActions.SET_IMAGE:
      return {
        ...state,
        uploadedImage: action.image
      };
    default:
      return state;
  }
};