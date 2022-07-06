import { DETAIL_INFOR, DETAIL_INFOR_ERROR, DETAIL_INFOR_SUCCESS, RELOAD_DATA_DETAIL } from '../constants';
import { InforDetailAction, InforDetailParams } from '../models';

export const detailInfor = (params: InforDetailParams): InforDetailAction => {
  return {
    type: DETAIL_INFOR,
    params: params,
  };
};

export const detailInforSuccess = (resp: any): InforDetailAction => {
  return {
    type: DETAIL_INFOR_SUCCESS,
    payload: resp,
  };
};

export const detailInforErrors = (error: InforDetailAction['error']): InforDetailAction => {
  return {
    type: DETAIL_INFOR_ERROR,
    error: error,
  };
};

export const reloadData = (): InforDetailAction => {
  return {
    type: RELOAD_DATA_DETAIL,
  };
};
