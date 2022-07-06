import { CREATE_DRIVER, CREATE_DRIVER_ERROR, CREATE_DRIVER_SUCCESS, SHOW_CREATE_DRIVER } from "../constanst";
import { CreateDriverAction, CreateDriverParams } from "../models";

export const showCreateDriverForm = (show: boolean): CreateDriverAction => {
  return {
    type: SHOW_CREATE_DRIVER,
    show: show,
  };
};

export const createDriver = (params: CreateDriverParams): CreateDriverAction => {
  return {
    type: CREATE_DRIVER,
    params: params,
  };
};

export const createDriverSuccess = () => {
  return {
    type: CREATE_DRIVER_SUCCESS,
  };
};

export const createDriverError = (error: CreateDriverAction['error']): CreateDriverAction => {
  return {
    type: CREATE_DRIVER_ERROR,
    error: error,
  };
};
