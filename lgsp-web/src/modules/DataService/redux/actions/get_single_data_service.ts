import { GET_SINGLE_DATA_SERVICE, GET_SINGLE_DATA_SERVICE_ERROR, GET_SINGLE_DATA_SERVICE_SUCCESS } from '../constants';
import { GetSingleDataServiceAction } from '../models';

export const getSingleDataService = (param: string): GetSingleDataServiceAction => {
  return {
    type: GET_SINGLE_DATA_SERVICE,
    dataServiceId: param,
  };
};

export const getSingleDataServiceSuccess = (resp: any): GetSingleDataServiceAction => {
  return {
    type: GET_SINGLE_DATA_SERVICE_SUCCESS,
    payload: resp,
  };
};

export const getSingleDataServiceError = (error: GetSingleDataServiceAction['error']): GetSingleDataServiceAction => {
  return {
    type: GET_SINGLE_DATA_SERVICE_ERROR,
    error: error,
  };
};
