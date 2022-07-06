import { SHOW_UPDATE_SERVICE_FORM, UPDATE_SERVICE, UPDATE_SERVICE_ERROR, UPDATE_SERVICE_SUCCESS } from '../constants';
import { UpdateServiceAction, UpdateServiceParam, CreateServiceAction, ServiceData } from '../models';
import { AppError } from '../../../../models/baseResponse';
export const showUpdateServiceForm = (show: boolean, data?: ServiceData): UpdateServiceAction => {
  if (data === undefined) {
    return {
      type: SHOW_UPDATE_SERVICE_FORM,
      show: show,
    };
  }
  return {
    type: SHOW_UPDATE_SERVICE_FORM,
    show: show,
    originData: data,
  };
};

export const updateService = (params: UpdateServiceParam): UpdateServiceAction => {
  return {
    type: UPDATE_SERVICE,
    params: params,
  };
};

export const updateServiceSuccess = (): CreateServiceAction => {
  return {
    type: UPDATE_SERVICE_SUCCESS,
  };
};

export const updateServiceError = (error: AppError): UpdateServiceAction => {
  return {
    type: UPDATE_SERVICE_ERROR,
    error: error,
  };
};
