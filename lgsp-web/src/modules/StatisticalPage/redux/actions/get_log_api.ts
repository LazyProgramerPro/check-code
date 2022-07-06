import { LOG_API, LOG_API_ERROR, LOG_API_SUCCESS, RELOAD_LOG_API } from '../constants';
import { GetApiAction, GetApiParams } from '../models';

export const getLogApi = (params: GetApiParams): GetApiAction => {
  return {
    type: LOG_API,
    params: params,
  };
};

export const getLogApiSuccess = (resp: any): GetApiAction => {
  return {
    type: LOG_API_SUCCESS,
    payload: resp,
  };
};

export const getLogApiErrors = (error: GetApiAction['error']): GetApiAction => {
  return {
    type: LOG_API_ERROR,
    error: error,
  };
};

export const reloadData = (): GetApiAction => {
  return {
    type: RELOAD_LOG_API,
  };
};
