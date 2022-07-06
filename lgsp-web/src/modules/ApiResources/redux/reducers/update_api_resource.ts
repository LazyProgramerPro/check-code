import {GetApiResourceAction, GetApiResourceState, UpdateApiResourceAction, UpdateApiResourceState} from "../models";
import {UPDATE_API_RESOURCE, UPDATE_API_RESOURCE_ERROR, UPDATE_API_RESOURCE_SUCCESS} from "../constants";

const initState: UpdateApiResourceState ={
  loading: false,
  error: undefined,
  params: undefined
}

export default (state=initState, {type, params, error}: UpdateApiResourceAction): UpdateApiResourceState => {
  switch (type){
    case UPDATE_API_RESOURCE:
      return {
        ...state,
        loading: true,
        params: params
      }

    case UPDATE_API_RESOURCE_SUCCESS:
        return {
          ...state,
          loading: false
        }

    case UPDATE_API_RESOURCE_ERROR:
        return {
          ...state,
          loading: false,
          error: error
        }

    default:
      return state;
  }
}
