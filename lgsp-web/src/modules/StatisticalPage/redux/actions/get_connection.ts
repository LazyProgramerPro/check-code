import { LOG_CONNECTION, LOG_CONNECTION_ERROR, LOG_CONNECTION_SUCCESS, RELOAD_LOG_CONNECTION } from '../constants';
import { GetDataAction, GetDataParams } from '../models';

export const getLogConnection = (params: GetDataParams): GetDataAction => {
  return {
    type: LOG_CONNECTION,
    params: params,
  };
};

export const getLogConnectionSuccess = (resp: any): GetDataAction => {
  return {
    type: LOG_CONNECTION_SUCCESS,
    payload: resp,
  };
};

export const getLogConnectionErrors = (error: GetDataAction['error']): GetDataAction => {
  return {
    type: LOG_CONNECTION_ERROR,
    error: error,
  };
};

export const reloadData = (): GetDataAction => {
  return {
    type: RELOAD_LOG_CONNECTION,
  };
};
