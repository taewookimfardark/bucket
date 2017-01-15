import * as modalActions from './modalActions';

const initialState = {
  visible: false,
  params: {}
};

const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case modalActions.OPEN_MODAL:
      return {
        ...state,
        visible: true,
        params: action.option
      };

    case modalActions.CLOSE_MODAL:
      return {
        ...state,
        visible: false,
        params: action.option
      };
    default:
      return state;
  }
};

export default modalReducer