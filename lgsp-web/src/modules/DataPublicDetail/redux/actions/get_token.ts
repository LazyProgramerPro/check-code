import { GET_TOKEN, GET_TOKEN_ERROR, GET_TOKEN_SUCCESS, RELOAD_DATA_TOKEN } from '../constanst';
import { GetTokenAction, GetTokenParams } from '../models';

export const getToken = (params: GetTokenParams): GetTokenAction => {
  return {
    type: GET_TOKEN,
    params: params,
  };
};

export const getTokenSuccess = (resp: any): GetTokenAction => {
  return {
    type: GET_TOKEN_SUCCESS,
    payload: resp,
  };
};

export const getTokenErrors = (error: GetTokenAction['error']): GetTokenAction => {
  return {
    type: GET_TOKEN_ERROR,
    error: error,
  };
};

export const reloadData = (): GetTokenAction => {
  return {
    type: RELOAD_DATA_TOKEN,
  };
};
