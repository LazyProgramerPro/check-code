import { DELETE_SERVICE, DELETE_SERVICE_ERROR, DELETE_SERVICE_SUCCESS, RELOAD_DATE_SERVICE_PUBLIC } from "../constants";
import { DeleteServiceAction, DeleteServiceParam } from "../models";

export const deleteService = (param?: DeleteServiceParam) => {
  return {
    type: DELETE_SERVICE,
    param: param,
  };
};

export const deleteServiceSuccess = () => {
  return {
    type: DELETE_SERVICE_SUCCESS,
  };
};

export const deleteServiceError = (error: DeleteServiceAction['error']) => {
  return {
    type: DELETE_SERVICE_ERROR,
    error: error,
  };
};

export const reloadData = (): DeleteServiceAction => {
  return {
    type: RELOAD_DATE_SERVICE_PUBLIC,
  };
};
