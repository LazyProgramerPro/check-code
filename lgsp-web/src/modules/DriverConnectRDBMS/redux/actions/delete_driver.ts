import { DELETE_DATA_DRIVER, DELETE_DRIVER_ERROR, DELETE_DRIVER_SUCCESS, RELOAD_DRIVER } from "../constanst";
import { DeleteDriverAction, DeleteDriverParam } from "../models";

export const deleteDriver = (param?: DeleteDriverParam) => {
  return {
    type: DELETE_DATA_DRIVER,
    param: param,
  };
};

export const deleteDriverSuccess = () => {
  return {
    type: DELETE_DRIVER_SUCCESS,
  };
};

export const deleteDriverError = (error: DeleteDriverAction['error']) => {
  return {
    type: DELETE_DRIVER_ERROR,
    error: error,
  };
};

export const reloadData = (): DeleteDriverAction => {
  return {
    type: RELOAD_DRIVER,
  };
};
