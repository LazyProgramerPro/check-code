import { GET_ID, GET_ID_ERROR, GET_ID_SUCCESS, RELOAD_DATA_ID } from '../constants';
import { GetIdAction, GetIdParams } from '../models';

export const getId = (params: GetIdParams): GetIdAction => {
  return {
    type: GET_ID,
    params: params,
  };
};

export const getIdSuccess = (resp: any): GetIdAction => {
  return {
    type: GET_ID_SUCCESS,
    payload: resp,
  };
};

export const getIdErrors = (error: GetIdAction['error']): GetIdAction => {
  return {
    type: GET_ID_ERROR,
    error: error,
  };
};

export const reloadData = (): GetIdAction => {
  return {
    type: RELOAD_DATA_ID,
  };
};
