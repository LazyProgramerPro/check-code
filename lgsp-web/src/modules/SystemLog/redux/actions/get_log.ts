import { GET_LOG, GET_LOG_ERROR, GET_LOG_SUCCESS, RELOAD_DATA } from '../constants';
import { GetLogAction, GetLogParams } from '../models';

export const getLog = (params: GetLogParams): GetLogAction => {
  return {
    type: GET_LOG,
    params: params,
  };
};
export const getLogSuccess = (resp: any): GetLogAction => {
  return {
    type: GET_LOG_SUCCESS,
    payload: resp,
  };
};

export const getLogErrors = (error: GetLogAction['error']): GetLogAction => {
  return {
    type: GET_LOG_ERROR,
    error: error,
  };
};
export const reloadData = (): GetLogAction => {
  return {
    type: RELOAD_DATA,
  };
};
