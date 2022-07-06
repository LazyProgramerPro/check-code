import {
  GET_API_SUBSCRIPTION_USER, GET_API_SUBSCRIPTION_USER_ERROR,
  GET_API_SUBSCRIPTION_USER_SUCCESS, RELOAD_API_SUBSCRIPTION_USER
} from "../constants";
import {GetApiSubscriptionUserAction, GetApiSubscriptionUserParam} from "../models";

export const getApiSubscriptionUser = (params: GetApiSubscriptionUserParam) : GetApiSubscriptionUserAction =>{
  return {
    type: GET_API_SUBSCRIPTION_USER,
    params: params
  }
}

export const getApiSubscriptionUserSuccess = (resp: any): GetApiSubscriptionUserAction => {
  return {
    type: GET_API_SUBSCRIPTION_USER_SUCCESS,
    payload: resp
  }
}

export const getApiSubscriptionUserError = (error: GetApiSubscriptionUserAction['error']): GetApiSubscriptionUserAction => {
  return{
    type: GET_API_SUBSCRIPTION_USER_ERROR,
    error: error
  }
}

export const reloadApiSubscriptionData = (): GetApiSubscriptionUserAction => {
  return {
    type: RELOAD_API_SUBSCRIPTION_USER
  }
}
