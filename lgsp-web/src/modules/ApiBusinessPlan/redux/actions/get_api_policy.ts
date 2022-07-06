import {GetApiPolicyAction} from "../models";
import {
  CHANGE_API_POLICY,
  GET_API_POLICY,
  GET_API_POLICY_ERROR,
  GET_API_POLICY_SUCCESS,
  RELOAD_API_POLICY
} from "../constants";


export const getApiPolicy = (apiId: string) : GetApiPolicyAction =>{
  return {
    type: GET_API_POLICY,
    apiId: apiId
  }
}

export const getApiPolicySuccess = (resp: any): GetApiPolicyAction => {
  return {
    type: GET_API_POLICY_SUCCESS,
    payload: resp
  }
}

export const getApiPolicyError = (error: GetApiPolicyAction['error']): GetApiPolicyAction => {
  return{
    type: GET_API_POLICY_ERROR,
    error: error
  }
}

export const reloadApiPolicyData = (): GetApiPolicyAction => {
  return {
    type: RELOAD_API_POLICY
  }
}

export const changeApiPolicy = (policies: string[]): GetApiPolicyAction => {
  return {
    type: CHANGE_API_POLICY,
    policies: policies,
  }
}
