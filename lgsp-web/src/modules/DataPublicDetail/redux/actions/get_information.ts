import { GET_INFORMATION, GET_INFORMATION_ERROR, GET_INFORMATION_SUCCESS, RELOAD_DATA_INFORMATION } from '../constanst';
import { GetInformationAction, GetInformationParams } from '../models';

export const getInformation = (params: GetInformationParams): GetInformationAction => {
  return {
    type: GET_INFORMATION,
    params: params,
  };
};

export const getInformationSuccess = (resp: any): GetInformationAction => {
  return {
    type: GET_INFORMATION_SUCCESS,
    payload: resp,
  };
};

export const getInformationErrors = (error: GetInformationAction['error']): GetInformationAction => {
  return {
    type: GET_INFORMATION_ERROR,
    error: error,
  };
};

export const reloadData = (): GetInformationAction => {
  return {
    type: RELOAD_DATA_INFORMATION,
  };
};
