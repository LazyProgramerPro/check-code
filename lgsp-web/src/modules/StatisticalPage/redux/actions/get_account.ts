import { GET_ACCOUNT, GET_ACCOUNT_ERROR, GET_ACCOUNT_SUCCESS, RELOAD_DATA_ACCOUNT } from '../constants';
import { GetAccountAction, GetAccountParams } from '../models';

export const getAccount = (params: GetAccountParams): GetAccountAction => {
  return {
    type: GET_ACCOUNT,
    params: params,
  };
};

export const getAccountSuccess = (resp: any): GetAccountAction => {
  return {
    type: GET_ACCOUNT_SUCCESS,
    payload: resp,
  };
};

export const getAccountErrors = (error: GetAccountAction['error']): GetAccountAction => {
  return {
    type: GET_ACCOUNT_ERROR,
    error: error,
  };
};

export const reloadData = (): GetAccountAction => {
  return {
    type: RELOAD_DATA_ACCOUNT,
  };
};
