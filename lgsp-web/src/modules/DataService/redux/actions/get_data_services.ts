import { GetDataServiceAction, GetDataServiceParams } from '../../../DataService/redux/models';
import {
  GET_ALL_DATA_SERVICE,
  GET_ALL_DATA_SERVICE_ERROR,
  GET_ALL_DATA_SERVICE_SUCCESS,
  RELOAD_DATA_DATA_SERVICE,
} from '../constants';

export const getAllDataService = (params: GetDataServiceParams): GetDataServiceAction => {
  return {
    type: GET_ALL_DATA_SERVICE,
    params: params,
  };
};

export const getAllDataServiceSuccess = (resp: any): GetDataServiceAction => {
  return {
    type: GET_ALL_DATA_SERVICE_SUCCESS,
    payload: resp,
  };
};

export const getAllDataServiceError = (error: GetDataServiceAction['error']): GetDataServiceAction => {
  return {
    type: GET_ALL_DATA_SERVICE_ERROR,
    error: error,
  };
};

export const reloadData = (): GetDataServiceAction => {
  return {
    type: RELOAD_DATA_DATA_SERVICE,
  };
};
