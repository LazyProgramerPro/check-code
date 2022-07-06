import { GET_SANDBOX, GET_SANDBOX_ERROR, GET_SANDBOX_SUCCESS, RELOAD_DATA_SANDBOX } from '../constanst';
import { GetSandboxAction, GetSandboxParams } from '../models';

export const getSandbox = (params: GetSandboxParams): GetSandboxAction => {
  return {
    type: GET_SANDBOX,
    params: params,
  };
};

export const getSandboxSuccess = (resp: any): GetSandboxAction => {
  return {
    type: GET_SANDBOX_SUCCESS,
    payload: resp,
  };
};

export const getSandboxErrors = (error: GetSandboxAction['error']): GetSandboxAction => {
  return {
    type: GET_SANDBOX_ERROR,
    error: error,
  };
};

export const reloadData = (): GetSandboxAction => {
  return {
    type: RELOAD_DATA_SANDBOX,
  };
};
