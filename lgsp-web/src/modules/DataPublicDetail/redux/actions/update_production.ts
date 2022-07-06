import { AppError } from 'src/models/common';
import { SHOW_DATA, UPDATE_PRODUCTION, UPDATE_PRODUCTION_ERROR, UPDATE_PRODUCTION_SUCCESS } from '../constanst';
import { GetProductionAction, Production, UpdateProductionAction, UpdateProductionParam } from '../models';

export const showUpdateProduction = (show: boolean, data?: Production): UpdateProductionAction => {
  if (data === undefined) {
    return {
      type: SHOW_DATA,
      show: show,
    };
  }
  return {
    type: SHOW_DATA,
    show: show,
    originData: data,
  };
};

export const updateProduction = (params: UpdateProductionParam): UpdateProductionAction => {
  return {
    type: UPDATE_PRODUCTION,
    params: params,
  };
};

export const updateProductionSuccess = (): GetProductionAction => {
  return {
    type: UPDATE_PRODUCTION_SUCCESS,
  };
};

export const updateProductionError = (error: AppError): UpdateProductionAction => {
  return {
    type: UPDATE_PRODUCTION_ERROR,
    error: error,
  };
};
