import { GetDriverAction, GetDriverParams } from '../models';
import {
  GET_DATA_DRIVER,
  GET_DATA_DRIVER_ERROR,
  GET_DATA_DRIVER_SUCCESS,
  LOAD_PAGE,
  RELOAD_DATA_DRIVER,
} from '../constanst';
export const getDriver = (params: GetDriverParams): GetDriverAction => {
  return {
    type: GET_DATA_DRIVER,
    params: params,
  };
};

export const getDriverSuccess = (resp: any): GetDriverAction => {
  return {
    type: GET_DATA_DRIVER_SUCCESS,
    payload: resp,
  };
};

export const getDriverErrors = (error: GetDriverAction['error']): GetDriverAction => {
  return {
    type: GET_DATA_DRIVER_ERROR,
    error: error,
  };
};

export const reloadData = (): GetDriverAction => {
  return {
    type: RELOAD_DATA_DRIVER,
  };
};

export const loadPage = () => {
  return {
    type: LOAD_PAGE,
  };
};
