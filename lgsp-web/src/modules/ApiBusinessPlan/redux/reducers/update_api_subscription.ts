import {UpdateApiPolicySubscriptionAction, UpdateApiPolicySubscriptionState} from "../models";
import {
  SHOW_UPDATE_SUBSCRIPTION_FORM,
  UPDATE_API_POLICY_SUBSCRIPTION,
  UPDATE_API_POLICY_SUBSCRIPTION_ERROR,
  UPDATE_API_POLICY_SUBSCRIPTION_SUCCESS
} from "../constants";

const initState: UpdateApiPolicySubscriptionState = {
  loading: false,
  error: undefined,
  params: undefined
}

export default (state = initState, {type, show, params, error}: UpdateApiPolicySubscriptionAction) : UpdateApiPolicySubscriptionState => {
  switch (type) {

    case SHOW_UPDATE_SUBSCRIPTION_FORM:
      if(params !== undefined){
          return {
            ...state,
            show: show,
            params: {
              apiId: "",
              username: params.username,
              policy: params.policy,
            }
          }
      }else {
        return {
          ...state,
          show: show,
        }
      }

    case UPDATE_API_POLICY_SUBSCRIPTION:
      return {
        ...state,
        loading: true,
        params: params
      }

    case UPDATE_API_POLICY_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case UPDATE_API_POLICY_SUBSCRIPTION_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
