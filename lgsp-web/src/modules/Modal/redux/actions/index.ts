import { SHOW_MODAL, HIDE_MODAL, CHANGE_MODAL_CONTENT, CHANGE_MODAL_TITLE } from './../constants';
import {  IModalAction, IModalState } from './../models';

export const showModal = (): IModalAction =>{
  return {
    type: SHOW_MODAL,
  }
}

export const hideModal = (): IModalAction =>{
  return {
    type: HIDE_MODAL,
  }
}

export const changeContentModal = ({component}: IModalState): IModalAction =>{
  return {
    type: CHANGE_MODAL_CONTENT,
    payload: {
      component
    }
  }
}

export const changeTitleModal = ({title}: IModalState): IModalAction =>{
  return {
    type: CHANGE_MODAL_TITLE,
    payload: {
      title
    }
  }
}
