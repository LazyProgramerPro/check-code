import { GET_SYSTEM_INTRO, GET_SYSTEM_INTRO_ERROR, GET_SYSTEM_INTRO_SUCCESS, RELOAD_DATA } from '../constants';
import { GetSystemInfoAction, GetSystemInfoParams } from '../models';

export const getSystemInfo = (params: GetSystemInfoParams): GetSystemInfoAction => {
  return {
    type: GET_SYSTEM_INTRO,
    params: params,
  };
};

export const getSystemInfoSuccess = (resp: any): GetSystemInfoAction => {
  return {
    type: GET_SYSTEM_INTRO_SUCCESS,
    payload: resp,
  };
};

export const getRSystemInfoErrors = (error: GetSystemInfoAction['error']): GetSystemInfoAction => {
  return {
    type: GET_SYSTEM_INTRO_ERROR,
    error: error,
  };
};

export const reloadData = (): GetSystemInfoAction => {
  return {
    type: RELOAD_DATA,
  };
};
