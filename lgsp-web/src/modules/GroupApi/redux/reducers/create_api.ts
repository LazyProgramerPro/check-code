import {CreateGroupRestApiAction, CreateGroupRestApiState} from "../models";
import {
  CREATE_GROUP_REST_API,
  CREATE_GROUP_REST_API_ERROR,
  CREATE_GROUP_REST_API_SUCCESS,
  SHOW_CREATE_GROUP_REST_API_FORM
} from "../constants";

const initState: CreateGroupRestApiState = {
  loading: false,
  params: undefined,
  show: false,
  error: undefined
}

export default (state = initState, {type, params, show, error}: CreateGroupRestApiAction): CreateGroupRestApiState => {
    switch (type){
      case SHOW_CREATE_GROUP_REST_API_FORM:
        return {
          ...state,
          show: !!show
        }

      case CREATE_GROUP_REST_API:
        return {
          ...state,
          params: params,
          loading: true
        }

      case CREATE_GROUP_REST_API_SUCCESS:
        return {
          ...state,
          loading: false
        }

      case CREATE_GROUP_REST_API_ERROR:
        return {
          ...state,
          loading: false,
          error: error
        }
      default:
        return state;
    }
}
