import { AppError } from 'src/models/baseResponse';
import { DataDriver, UpdateDriverAction, UpdateDriverParam } from '../models';
import { SHOW_UPDATE_DRIVER_FORM, UPDATE_DRIVER, UPDATE_DRIVER_ERROR, UPDATE_DRIVER_SUCCESS } from '../constanst';
export const showUpdateDriverForm = (show: boolean, data?: DataDriver): UpdateDriverAction => {
  if (data === undefined) {
    return {
      type: SHOW_UPDATE_DRIVER_FORM,
      show: show,
    };
  }
  return {
    type: SHOW_UPDATE_DRIVER_FORM,
    show: show,
    originData: data,
  };
};

export const updateDriver = (params: UpdateDriverParam): UpdateDriverAction => {
  return {
    type: UPDATE_DRIVER,
    params: params,
  };
};

export const updateDriverSuccess = (): UpdateDriverAction => {
  return {
    type: UPDATE_DRIVER_SUCCESS,
  };
};

export const updateDriverError = (error: AppError): UpdateDriverAction => {
  return {
    type: UPDATE_DRIVER_ERROR,
    error: error,
  };
};
