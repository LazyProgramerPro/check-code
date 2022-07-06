import {UpdateApiPolicyAction, UpdateApiPolicyState} from "../models";
import {UPDATE_API_POLICY, UPDATE_API_POLICY_ERROR, UPDATE_API_POLICY_SUCCESS} from "../constants";

const initState: UpdateApiPolicyState = {
  loading: false,
  error: undefined,
  params: undefined
}

export default (state = initState, {type, params, error}: UpdateApiPolicyAction) : UpdateApiPolicyState => {
  switch (type) {

    case UPDATE_API_POLICY:
      return {
        ...state,
        loading: true,
        params: params
      }
      
    case UPDATE_API_POLICY_SUCCESS:
      return {
        ...state,
        loading: false
      }
      
    case UPDATE_API_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }
    
    default:
      return state;
  }
}
