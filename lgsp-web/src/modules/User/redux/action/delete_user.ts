import {DeleteUserAction, DeleteUserParam} from "../models";
import {
  CLICK_DELETE_USER_BUTTON,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  SHOW_DELETE_USER_CONFIRM
} from "../constant";


export const showDeleteUserConfirm = (show: boolean, username?: string) : DeleteUserAction => {
  if(username !== undefined){
    return {
      type: SHOW_DELETE_USER_CONFIRM,
      show: show,
      param: {
        username: username
      }
    }
  }
  return {
    type: SHOW_DELETE_USER_CONFIRM,
    show: show,
  }
}

export const deleteUser = (param: DeleteUserParam) : DeleteUserAction =>{
  return {
    type: DELETE_USER,
    param: param
  }
}

export const deleteUserSuccess = () : DeleteUserAction =>{
  return {
    type: DELETE_USER_SUCCESS,
  }
}

export const deleteUserError = (error : DeleteUserAction['error']) : DeleteUserAction =>{
  return {
    type: DELETE_USER_ERROR,
    error : error
  }
}
