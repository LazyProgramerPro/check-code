import { SHOW_CREATE, CREATE_RESOURCE, CREATE_RESOURCE_SUCCESS, CREATE_RESOURCE_ERROR } from '../constanst';
import { CreateResourceParams, CreateResourceAction } from '../models';

export const showCreateResourceForm = (show: boolean): CreateResourceAction => {
  console.log('actions');
  return {
    type: SHOW_CREATE,
    show: show,
  };
};

export const createResource = (params: CreateResourceParams): CreateResourceAction => {
  return {
    type: CREATE_RESOURCE,
    params: params,
  };
};

export const createResourceSuccess = () => {
  return {
    type: CREATE_RESOURCE_SUCCESS,
  };
};

export const createResourceError = (error: CreateResourceAction['error']): CreateResourceAction => {
  return {
    type: CREATE_RESOURCE_ERROR,
    error: error,
  };
};
