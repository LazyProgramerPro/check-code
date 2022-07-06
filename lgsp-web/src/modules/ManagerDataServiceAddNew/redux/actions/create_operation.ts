import {
  CLOSE_FORM_ADD_OPERATION,
  CREATE_OPERATION,
  DELETE_OPERATION,
  EDIT_OPERATION,
  OPEN_FORM_ADD_OPERATION,
  RESET_OPERATION,
  SAVE_OPERATION,
  SET_PAGE_OPERATION_TABLE,
  UPDATE_OPERATION,
} from '../constant';
import { CreateOperationAction, CreateOperationParams } from '../models';

export const openFormAddOperation = (isUpdate?: boolean): CreateOperationAction => {
  return {
    type: OPEN_FORM_ADD_OPERATION,
    isUpdate: isUpdate ? isUpdate : false,
  };
};

export const closeFormAddOperation = (): any => {
  return {
    type: CLOSE_FORM_ADD_OPERATION,
  };
};

export const createOperation = (params: CreateOperationParams): CreateOperationAction => {
  return {
    type: CREATE_OPERATION,
    params: params,
  };
};

export const deleteOperation = (operationName: string): CreateOperationAction => {
  return {
    type: DELETE_OPERATION,
    operationName: operationName,
  };
};

export const editOperation = (params: CreateOperationParams): CreateOperationAction => {
  return {
    type: EDIT_OPERATION,
    params: params,
  };
};

export const saveEditOperation = (params: CreateOperationParams): CreateOperationAction => {
  return {
    type: SAVE_OPERATION,
    params: params,
  };
};

export const UpdateOperation = (operationUpdate: CreateOperationParams[]): CreateOperationAction => {
  return {
    type: UPDATE_OPERATION,
    operationUpdate: operationUpdate,
  };
};

export const resetOperation = () => {
  return {
    type: RESET_OPERATION,
  };
};

export const setPageOperationTable = (page: number) => {
  return {
    type: SET_PAGE_OPERATION_TABLE,
    page: page,
  };
};
