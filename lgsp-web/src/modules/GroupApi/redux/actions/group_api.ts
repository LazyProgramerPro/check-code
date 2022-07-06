import { DELETE_GROUP_REST_API, DELETE_GROUP_API_ERROR, DELETE_GROUP_API_SUCCESS } from '../constants';
import { CREATE_WSDL_FILE_API, SET_ROW_EDITTING } from '../constants';
import { IRestApiObject } from '../models';
import { GetGroupRestApiAction, IGroupApiParams, IGroupApiAction } from '../models';
import {
  GET_ALL_GROUP_REST_API,
  GET_ALL_GROUP_REST_API_SUCCESS,
  RELOAD_DATA_GROUP_REST_API,
  CREATE_GROUP_REST_API,
  CREATE_GROUP_REST_API_SUCCESS,
  GET_ALL_GROUP_REST_API_ERROR,
  CREATE_GROUP_REST_API_ERROR,
} from '../constants';

export const getAllGroupRestApi = (params: IGroupApiParams): IGroupApiAction => {
  return {
    type: GET_ALL_GROUP_REST_API,
    params: params,
  };
};

export const getAllGroupRestApiSuccess = (resp: any): IGroupApiAction => {
  return {
    type: GET_ALL_GROUP_REST_API_SUCCESS,
    payload: resp,
  };
};

export const getAllGroupRestApiError = (error: IGroupApiAction['error']): IGroupApiAction => {
  return {
    type: GET_ALL_GROUP_REST_API_ERROR,
    error: error,
  };
};

export const reloadData = (): IGroupApiAction => {
  return {
    type: RELOAD_DATA_GROUP_REST_API,
  };
};

//Create
export const createGroupRestApi = (payload: Partial<IRestApiObject>, callback: () => void): IGroupApiAction => {
  return {
    type: CREATE_GROUP_REST_API,
    payload: payload,
    callback,
  };
};

export const createGroupRestApiSuccess = (): IGroupApiAction => {
  return {
    type: CREATE_GROUP_REST_API_SUCCESS,
  };
};

export const createGroupRestApiError = (error: IGroupApiAction['error']): IGroupApiAction => {
  return {
    type: CREATE_GROUP_REST_API_ERROR,
    error: error,
  };
};

export const deleteGroupApi = (payload: Partial<IRestApiObject>): IGroupApiAction => {
  return {
    type: DELETE_GROUP_REST_API,
    payload: payload,
  };
};

export const deleteGroupApiSuccess = (payload: Partial<IRestApiObject>): IGroupApiAction => {
  return {
    type: DELETE_GROUP_API_SUCCESS,
    payload: payload,
  };
};

export const deleteGroupApiError = (error: IGroupApiAction['error']): IGroupApiAction => {
  return {
    type: DELETE_GROUP_API_ERROR,
    error: error,
  };
};

export const setRowApiEditting = (rowData: IRestApiObject | null): IGroupApiAction => {
  return {
    type: SET_ROW_EDITTING,
    rowEditting: rowData,
  };
};

export const createWsdlFileApi = (payload: FormData, callback: () => void): IGroupApiAction => {
  return {
    type: CREATE_WSDL_FILE_API,
    payload: payload,
    callback: callback,
  };
};

export const createWsdlFileApiSuccess = (): IGroupApiAction => {
  return {
    type: CREATE_GROUP_REST_API_SUCCESS,
  };
};

export const createWsdlFileApiError = (error: IGroupApiAction['error']): IGroupApiAction => {
  return {
    type: CREATE_GROUP_REST_API_ERROR,
    error: error,
  };
};
