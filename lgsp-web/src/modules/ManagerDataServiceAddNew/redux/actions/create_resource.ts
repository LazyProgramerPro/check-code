import {
  // ADD_RESOURCE,
  CLOSE_FORM_ADD_RESOURCE,
  CREATE_RESOURCE,
  DELETE_RESOURCE,
  EDIT_RESOURCE,
  OPEN_FORM_ADD_RESOURCE,
  RESET_RESOURCE,
  SAVE_RESOURCE,
  SET_PAGE_RESOURCE_TABLE,
  UPDATE_DATARESOURCE,
} from '../constant';
import { CreateDataSourceAction, CreateResourceAction, CreateResourceParams } from '../models';

export const openFormAddResource = (isUpdate?: boolean): CreateDataSourceAction => {
  return {
    type: OPEN_FORM_ADD_RESOURCE,
    isUpdate: isUpdate ? isUpdate : false,
  };
};

export const closeFormAddResource = (): any => {
  return {
    type: CLOSE_FORM_ADD_RESOURCE,
  };
};

export const createResource = (params: CreateResourceParams): CreateResourceAction => {
  return {
    type: CREATE_RESOURCE,
    params: params,
  };
};

export const deleteResource = (resourcePath: string, resourceMethod: string): CreateResourceAction => {
  return {
    type: DELETE_RESOURCE,
    resourcePath: resourcePath,
    resourceMethod: resourceMethod,
  };
};

export const editResource = (params: CreateResourceParams): CreateResourceAction => {
  return {
    type: EDIT_RESOURCE,
    params: params,
  };
};

export const saveEditResource = (params: CreateResourceParams): CreateResourceAction => {
  return {
    type: SAVE_RESOURCE,
    params: params,
  };
};

export const UpdateResource = (updateResource: CreateResourceParams[]): CreateResourceAction => {
  return {
    type: UPDATE_DATARESOURCE,
    updateResource: updateResource,
  };
};

export const resetResource = () => {
  return {
    type: RESET_RESOURCE,
  };
};
export const setPageResourceTable = (page: number) => {
  return {
    type: SET_PAGE_RESOURCE_TABLE,
    page: page,
  };
};
