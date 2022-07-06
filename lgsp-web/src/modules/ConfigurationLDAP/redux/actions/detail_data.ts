import { DETAIL_DATA, DETAIL_DATA_ERROR, DETAIL_DATA_SUCCESS, RELOAD_DATA_DETAIL } from "../constanst";
import { DataDetailAction, DataDetailParams } from "../models";


export const detailData = (params: DataDetailParams): DataDetailAction => {
  return {
    type: DETAIL_DATA,
    params: params,
  };
};

export const detailDataSuccess = (resp: any): DataDetailAction => {
  return {
    type: DETAIL_DATA_SUCCESS,
    payload: resp,
  };
};

export const detailDataErrors = (error: DataDetailAction['error']): DataDetailAction => {
  return {
    type: DETAIL_DATA_ERROR,
    error: error,
  };
};

export const reloadData = (): DataDetailAction => {
  return {
    type: RELOAD_DATA_DETAIL,
  };
};
