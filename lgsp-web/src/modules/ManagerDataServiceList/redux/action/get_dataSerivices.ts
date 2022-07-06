import {
  GET_LIST_DATA_SERVICE,
  GET_LIST_DATA_SERVICE_ERROR,
  GET_LIST_DATA_SERVICE_SUCCESS,
  RELOAD_LIST_DATA,
} from '../constant';
import { GetListDataServiceAction, GetListDataServiceParams } from '../models';

export const getListDataServices = (params: GetListDataServiceParams): GetListDataServiceAction => {
  return {
    type: GET_LIST_DATA_SERVICE,
    params: params,
  };
};

export const getListDataServicesSuccess = (resp: any): GetListDataServiceAction => {
  return {
    type: GET_LIST_DATA_SERVICE_SUCCESS,
    payload: resp,
  };
};

export const getListDataServicesError = (error: GetListDataServiceAction['error']): GetListDataServiceAction => {
  return {
    type: GET_LIST_DATA_SERVICE_ERROR,
    error: error,
  };
};

export const reloadData = (): GetListDataServiceAction => {
  return {
    type: RELOAD_LIST_DATA,
  };
};
