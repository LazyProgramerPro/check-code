import {UpdateApiPolicyAction, UpdateApiPolicyParam} from "../models";
import {
  UPDATE_API_POLICY,
  UPDATE_API_POLICY_ERROR,
  UPDATE_API_POLICY_SUCCESS
} from "../constants";

export const updateApiPolicy = (params: UpdateApiPolicyParam) : UpdateApiPolicyAction =>{
  return {
    type: UPDATE_API_POLICY,
    params: params,
  }
}

export const updateApiPolicySuccess = (resp: any): UpdateApiPolicyAction => {
  return {
    type: UPDATE_API_POLICY_SUCCESS,
  }
}

export const updateApiPolicyError = (error: UpdateApiPolicyAction['error']): UpdateApiPolicyAction => {
  return{
    type: UPDATE_API_POLICY_ERROR,
    error: error
  }
}
