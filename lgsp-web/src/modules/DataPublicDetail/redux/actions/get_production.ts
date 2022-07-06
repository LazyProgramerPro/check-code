import { GET_PRODUCTION, GET_PRODUCTION_ERROR, GET_PRODUCTION_SUCCESS, RELOAD_DATA_PRODUCTION } from '../constanst';
import { GetProductionAction, GetProductionParams } from '../models';

export const getProduction = (params: GetProductionParams): GetProductionAction => {
  return {
    type: GET_PRODUCTION,
    params: params,
  };
};

export const getProductionSuccess = (resp: any): GetProductionAction => {
  return {
    type: GET_PRODUCTION_SUCCESS,
    payload: resp,
  };
};

export const getProductionErrors = (error: GetProductionAction['error']): GetProductionAction => {
  return {
    type: GET_PRODUCTION_ERROR,
    error: error,
  };
};

export const reloadData = (): GetProductionAction => {
  return {
    type: RELOAD_DATA_PRODUCTION,
  };
};
