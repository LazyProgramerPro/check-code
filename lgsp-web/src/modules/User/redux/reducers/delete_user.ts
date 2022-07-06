import {DeleteUserAction, DeleteUserState} from "../models";
import {DELETE_USER, DELETE_USER_ERROR, DELETE_USER_SUCCESS, SHOW_DELETE_USER_CONFIRM} from "../constant";

const initState: DeleteUserState = {
  loading: false,
  show: false,
  canDelete: true,
  param: {
    username: "",
  },
  message: "",
  error: undefined
}

export default (state = initState,  {type, show,  param, error}: DeleteUserAction): DeleteUserState =>{

  switch (type) {
    case SHOW_DELETE_USER_CONFIRM:
      if(param !== undefined){
        return {
          ...state,
          show: !!show,
          param: param
        }
      }
      return {
        ...state,
        show: !!show,
      }

    case DELETE_USER:
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
