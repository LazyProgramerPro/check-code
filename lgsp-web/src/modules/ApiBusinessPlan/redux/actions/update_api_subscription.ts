import {UpdateApiPolicySubscriptionAction, UpdateApiPolicySubscriptionParam} from "../models";
import {
  SHOW_UPDATE_SUBSCRIPTION_FORM,
  UPDATE_API_POLICY_SUBSCRIPTION,
  UPDATE_API_POLICY_SUBSCRIPTION_ERROR,
  UPDATE_API_POLICY_SUBSCRIPTION_SUCCESS
} from "../constants";

export const showUpdateSubscriptionForm = (show: boolean, username?: string, policy?: string): UpdateApiPolicySubscriptionAction => {
  if(username !== undefined && policy !== undefined){
    return {
      type: SHOW_UPDATE_SUBSCRIPTION_FORM,
      show: show,
      params: {
        apiId: "",
        username: username,
        policy: policy
      }
    }
  }else {
    return {
      type: SHOW_UPDATE_SUBSCRIPTION_FORM,
      show: show
    }
  }
}

export const updateApiPolicySubscription = (params: UpdateApiPolicySubscriptionParam) : UpdateApiPolicySubscriptionAction =>{
  return {
    type: UPDATE_API_POLICY_SUBSCRIPTION,
    params: params,
  }
}

export const updateApiPolicySubscriptionSuccess = (resp: any): UpdateApiPolicySubscriptionAction => {
  return {
    type: UPDATE_API_POLICY_SUBSCRIPTION_SUCCESS,
  }
}

export const updateApiPolicySubscriptionError = (error: UpdateApiPolicySubscriptionAction['error']): UpdateApiPolicySubscriptionAction => {
  return{
    type: UPDATE_API_POLICY_SUBSCRIPTION_ERROR,
    error: error
  }
}
