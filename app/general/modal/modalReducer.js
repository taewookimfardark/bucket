import * as modalActions from './modalActions';

const initialState = {
  visible: false,
  params: {},
  name: ''
};

const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case modalActions.OPEN_MODAL:
      return {
        ...state,
        visible: true,
        name: action.name,
        params: action.option
      };

    case modalActions.CLOSE_MODAL:
      return {
        ...state,
        visible: false,
        name: '',
        params: null
      };
    default:
      return state;
  }
};

export default modalReducer