import { GET_DETAIL_DATA_SERVICE, GET_DETAIL_DATA_SERVICE_ERROR, GET_DETAIL_DATA_SERVICE_SUCCESS } from '../constant';
import { DetailDataService, DetailDataServiceAction } from '../models';

export const getDetailDataService = (id: string): DetailDataServiceAction => {
  return {
    type: GET_DETAIL_DATA_SERVICE,
    id: id,
  };
};

export const getDetailDataServiceSuccess = (params: DetailDataService): DetailDataServiceAction => {
  return {
    type: GET_DETAIL_DATA_SERVICE_SUCCESS,
    params: params,
  };
};

export const getDetailDataServiceError = (error: DetailDataServiceAction['error']): DetailDataServiceAction => {
  return {
    type: GET_DETAIL_DATA_SERVICE_ERROR,
    error,
  };
};
