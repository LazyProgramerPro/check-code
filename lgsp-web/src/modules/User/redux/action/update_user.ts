import {SHOW_UPDATE_USER_FORM, UPDATE_USER, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS} from "../constant";
import {CreateUserParams, UpdateUserAction, UpdateUserParam, UserEntity} from "../models";


export const showUpdateUserForm = (show: boolean, originData?: UserEntity) : UpdateUserAction => {
  return {
    type: SHOW_UPDATE_USER_FORM,
    show: show,
    originData: originData
  }
}

export const updateUser = (param : UpdateUserParam): UpdateUserAction => {
  return {
    type: UPDATE_USER,
    param: param
  }
}

export const updateUserSuccess = () => {
  return{
    type: UPDATE_USER_SUCCESS
  }
}

export const updateUserError = (error: UpdateUserAction['error']): UpdateUserAction => {
  return{
    type: UPDATE_USER_ERROR,
    error: error
  }
}
