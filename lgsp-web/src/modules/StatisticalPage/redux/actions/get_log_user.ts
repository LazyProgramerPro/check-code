import { LOG_USER, LOG_USER_ERROR, LOG_USER_SUCCESS, RELOAD_LOG_USER } from '../constants';
import { GetLogUserAction, GetLogUserParams } from '../models';

export const getLogUser = (params: GetLogUserParams): GetLogUserAction => {
  return {
    type: LOG_USER,
    params: params,
  };
};

export const getLogUserSuccess = (resp: any): GetLogUserAction => {
  return {
    type: LOG_USER_SUCCESS,
    payload: resp,
  };
};

export const getLogUserErrors = (error: GetLogUserAction['error']): GetLogUserAction => {
  return {
    type: LOG_USER_ERROR,
    error: error,
  };
};

export const reloadData = (): GetLogUserAction => {
  return {
    type: RELOAD_LOG_USER,
  };
};
