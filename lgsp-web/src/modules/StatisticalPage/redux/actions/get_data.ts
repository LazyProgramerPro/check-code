import { LOG_DATA, LOG_DATA_ERROR, LOG_DATA_SUCCESS, RELOAD_LOG_DATA } from '../constants';
import { DataStatiscalAction, DataStatiscalParams } from '../models';

export const getData = (params: DataStatiscalParams): DataStatiscalAction => {
  return {
    type: LOG_DATA,
    params: params,
  };
};

export const getDataSuccess = (resp: any): DataStatiscalAction => {
  return {
    type: LOG_DATA_SUCCESS,
    payload: resp,
  };
};

export const getDataErrors = (error: DataStatiscalAction['error']): DataStatiscalAction => {
  return {
    type: LOG_DATA_ERROR,
    error: error,
  };
};

export const reloadData = (): DataStatiscalAction => {
  return {
    type: RELOAD_LOG_DATA,
  };
};
