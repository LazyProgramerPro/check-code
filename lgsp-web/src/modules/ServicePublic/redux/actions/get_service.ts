import { GET_SERVICE, GET_SERVICE_ERROR, GET_SERVICE_SUCCESS, LOAD_PAGE, RELOAD_DATA } from '../constants';
import { GetServiceAction, GetServiceParams } from '../models';

export const getService = (params: GetServiceParams): GetServiceAction => {
  return {
    type: GET_SERVICE,
    params: params,
  };
};
export const getServiceSuccess = (resp: any): GetServiceAction => {
  return {
    type: GET_SERVICE_SUCCESS,
    payload: resp,
  };
};

export const getServiceErrors = (error: GetServiceAction['error']): GetServiceAction => {
  return {
    type: GET_SERVICE_ERROR,
    error: error,
  };
};
export const reloadData = (): GetServiceAction => {
  return {
    type: RELOAD_DATA,
  };
};
export const loadPage = () => {
  return {
    type: LOAD_PAGE,
  };
};
