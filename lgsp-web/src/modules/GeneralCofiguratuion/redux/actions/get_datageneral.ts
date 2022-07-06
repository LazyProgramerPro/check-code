import { DATA_GENERAL, DATA_GENERAL_ERROR, DATA_GENERAL_SUCCESS, RELOAD_DATA_GENERAL } from "../constanst";
import { DataGeneralAction, DataGeneralParams } from "../models";

export const getGeneral = (params: DataGeneralParams): DataGeneralAction => {
  return {
    type: DATA_GENERAL,
    params: params,
  };
};

export const getGeneralSuccess = (resp: any): DataGeneralAction => {
  return {
    type: DATA_GENERAL_SUCCESS,
    payload: resp,
  };
};

export const getGeneralErrors = (error: DataGeneralAction['error']): DataGeneralAction => {
  return {
    type: DATA_GENERAL_ERROR,
    error: error,
  };
};

export const reloadData = (): DataGeneralAction => {
  return {
    type: RELOAD_DATA_GENERAL,
  };
};
