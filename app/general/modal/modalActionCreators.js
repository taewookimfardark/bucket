import * as modalActions from './modalActions';

export function openModal(option) {
  return {
    type: modalActions.OPEN_MODAL,
    option
  }
}

export function closeModal(option) {
  return {
    type: modalActions.CLOSE_MODAL,
    option
  }
}