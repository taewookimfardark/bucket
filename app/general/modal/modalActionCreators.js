import * as modalActions from './modalActions';

export function openModal(name, option) {
  return {
    type: modalActions.OPEN_MODAL,
    name,
    option
  }
}

export function closeModal() {
  return {
    type: modalActions.CLOSE_MODAL
  }
}