import {UpdateUserAction, UpdateUserState} from "../models";
import {SHOW_UPDATE_USER_FORM, UPDATE_USER, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS} from "../constant";

const initState: UpdateUserState = {
  loading: false,
  show: false,
  param: undefined,
  error: undefined,
  originData: undefined
}

export default (state = initState, {type, show, originData, param, error}: UpdateUserAction): UpdateUserState => {
  switch (type) {
    case SHOW_UPDATE_USER_FORM:
      return {
        ...state,
        show: !!show,
        originData: originData,
      }

    case UPDATE_USER:
      console.log("red: " + JSON.stringify(param));
      return {
        ...state,
        loading: true,
        param: param,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
    }
  }
