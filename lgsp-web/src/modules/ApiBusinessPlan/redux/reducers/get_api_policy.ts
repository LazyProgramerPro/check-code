import {GetApiPolicyAction, GetApiPolicyState} from "../models";
import {
  CHANGE_API_POLICY,
  GET_API_POLICY,
  GET_API_POLICY_ERROR,
  GET_API_POLICY_SUCCESS,
  RELOAD_API_POLICY
} from "../constants";

const initState: GetApiPolicyState = {
  loading: false,
  error: undefined,
  flag_reload: false,
  apiId: '',
  item: {
    policies: [],
    lastUpdate: ''
  }
}


export default (state = initState, {type, apiId, policies, payload, error}: GetApiPolicyAction): GetApiPolicyState => {
  switch (type) {
    case GET_API_POLICY:
      return {
        ...state,
        loading: true,
        apiId: apiId
      }
      
    case GET_API_POLICY_SUCCESS:
      if(payload === undefined){
        return state;
      }
      return {
        ...state,
        loading: false,
        item: payload.item
      }
      
    case GET_API_POLICY_ERROR:
      return {
        ...state,
        loading: true,
        error: error
      }

    case RELOAD_API_POLICY:
      return {
        ...state,
        flag_reload: !state.flag_reload
      }

    case CHANGE_API_POLICY:
      return {
        ...state,
        item: {
          ...state.item,
          policies: policies || []
        }
      }
    default:
      return state;
  }
}
