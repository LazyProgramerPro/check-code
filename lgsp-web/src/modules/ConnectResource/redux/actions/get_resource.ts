import { GetResourceAction, GetResourceParams } from '../models';
import { GET_RESOURCE, GET_RESOURCE_SUCCESS, GET_RESOURCE_ERROR, RELOAD_DATA_RESOURCE, LOAD_PAGE } from '../constanst';
export const getResource = (params: GetResourceParams): GetResourceAction => {
  return {
    type: GET_RESOURCE,
    params: params,
  };
};

export const getResourceSuccess = (resp: any): GetResourceAction => {
  return {
    type: GET_RESOURCE_SUCCESS,
    payload: resp,
  };
};

export const getResourceErrors = (error: GetResourceAction['error']): GetResourceAction => {
  return {
    type: GET_RESOURCE_ERROR,
    error: error,
  };
};

export const reloadData = (): GetResourceAction => {
  return {
    type: RELOAD_DATA_RESOURCE,
  };
};
export const loadPage = () => {
  return {
    type: LOAD_PAGE,
  };
};
