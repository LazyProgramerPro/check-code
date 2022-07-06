import { GET_DATA, GET_DATA_ERROR, GET_DATA_SUCCESS, RELOAD_DATA } from "../constanst";
import { GetDataAction, GetDataParams } from "../models";


export const getData = (params: GetDataParams): GetDataAction => {
  return {
    type: GET_DATA,
    params: params,
  };
};
export const getDataSuccess = (resp: any): GetDataAction => {
  return {
    type: GET_DATA_SUCCESS,
    payload: resp,
  };
};

export const getDataErrors = (error: GetDataAction['error']): GetDataAction => {
  return {
    type: GET_DATA_ERROR,
    error: error,
  };
};
export const reloadData = (): GetDataAction => {
  return {
    type: RELOAD_DATA,
  };
};
