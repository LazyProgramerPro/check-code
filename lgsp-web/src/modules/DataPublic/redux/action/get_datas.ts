import { GET_ALL_DATAS, GET_ALL_DATAS_ERROR, GET_ALL_DATAS_SUCCESS, RELOAD_DATA } from '../constant';
import { GetDataAction, GetDataParams } from '../models';

export const getAllDatas = (params: GetDataParams): GetDataAction => {
  return {
    type: GET_ALL_DATAS,
    params: params,
  };
};
export const getAllDatasSuccess = (resp: any): GetDataAction => {
  return {
    type: GET_ALL_DATAS_SUCCESS,
    payload: resp,
  };
};

export const getAllDatasErrors = (error: GetDataAction['error']): GetDataAction => {
  return {
    type: GET_ALL_DATAS_ERROR,
    error: error,
  };
};
export const reloadData = (): GetDataAction => {
  return {
    type: RELOAD_DATA,
  };
};
