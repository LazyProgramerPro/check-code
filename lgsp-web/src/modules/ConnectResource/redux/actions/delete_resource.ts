
import { DELETE_DATA_RESOURCE, DELETE_RESOURCE_ERROR, DELETE_RESOURCE_SUCCESS, RELOAD_RESOURCE } from "../constanst";
import { DeleteResourceAction, DeleteResourceParam } from "../models";

export const deleteResource = (param?: DeleteResourceParam) => {
  return {
    type: DELETE_DATA_RESOURCE,
    param: param,
  };
};

export const deleteResourceSuccess = () => {
  return {
    type: DELETE_RESOURCE_SUCCESS,
  };
};

export const deleteResourceError = (error: DeleteResourceAction['error']) => {
  return {
    type: DELETE_RESOURCE_ERROR,
    error: error,
  };
};

export const reloadData = (): DeleteResourceAction => {
  return {
    type: RELOAD_RESOURCE,
  };
};
