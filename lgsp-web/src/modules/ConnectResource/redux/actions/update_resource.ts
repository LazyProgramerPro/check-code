import { AppError } from 'src/models/baseResponse';
import {
  SHOW_UPDATE_RESOURCE_FORM,
  UPDATE_RESOURCE,
  UPDATE_RESOURCE_ERROR,
  UPDATE_RESOURCE_SUCCESS,
} from '../constanst';
import { CreateResourceAction, Resource, UpdateResourceAction, UpdateResourceParam } from '../models';

export const showUpdateResourceForm = (show: boolean, data?: Resource): UpdateResourceAction => {
  if (data === undefined) {
    return {
      type: SHOW_UPDATE_RESOURCE_FORM,
      show: show,
    };
  }
  return {
    type: SHOW_UPDATE_RESOURCE_FORM,
    show: show,
    originData: data,
  };
};

export const updateResource = (params: UpdateResourceParam): UpdateResourceAction => {
  return {
    type: UPDATE_RESOURCE,
    params: params,
  };
};

export const updateResourceSuccess = (): CreateResourceAction => {
  return {
    type: UPDATE_RESOURCE_SUCCESS,
  };
};

export const updateResourceError = (error: AppError): UpdateResourceAction => {
  return {
    type: UPDATE_RESOURCE_ERROR,
    error: error,
  };
};
