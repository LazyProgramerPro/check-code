import {
  CREATE_SERVICE_ACCESS,
  CREATE_SERVICE_ACCESS_ERROR,
  CREATE_SERVICE_ACCESS_SUCCESS,
  DELETE_SERVICE_ACCESS,
  DELETE_SERVICE_ACCESS_ERROR,
  DELETE_SERVICE_ACCESS_SUCCESS,
  GET_LIST_SERVICE_ACCESS,
  GET_LIST_SERVICE_ACCESS_ERROR,
  GET_LIST_SERVICE_ACCESS_SUCCESS,
  GET_PERMISSION_LIST_ACCESS_LIMIT,
  GET_PERMISSION_LIST_ACCESS_LIMIT_ERROR,
  GET_PERMISSION_LIST_ACCESS_LIMIT_SUCCESS,
  UPDATE_SERVICE_ACCESS,
  UPDATE_SERVICE_ACCESS_ERROR,
  UPDATE_SERVICE_ACCESS_SUCCESS,
} from '../constant';
import {
  GetServiceAccessLimitParams,
  PermissionAccessLimit,
  ServiceAccessLimit,
  ServiceAccessLimitAction,
} from '../models';

export const getListServicesAccess = (params: GetServiceAccessLimitParams): ServiceAccessLimitAction => {
  return {
    type: GET_LIST_SERVICE_ACCESS,
    params: params,
  };
};

export const getListServicesAccessSuccess = (payload: any): ServiceAccessLimitAction => {
  return {
    type: GET_LIST_SERVICE_ACCESS_SUCCESS,
    payload: payload,
  };
};

export const getListServicesAccessError = (error: ServiceAccessLimitAction['error']): ServiceAccessLimitAction => {
  return {
    type: GET_LIST_SERVICE_ACCESS_ERROR,
    error: error,
  };
};

// DELETE

export const deleteServicesAccess = (id: string): ServiceAccessLimitAction => {
  return {
    type: DELETE_SERVICE_ACCESS,
    id: id,
  };
};

export const deleteServicesAccessSuccess = (): ServiceAccessLimitAction => {
  return {
    type: DELETE_SERVICE_ACCESS_SUCCESS,
  };
};

export const deleteServicesAccessError = (error: ServiceAccessLimitAction['error']): ServiceAccessLimitAction => {
  return {
    type: DELETE_SERVICE_ACCESS_ERROR,
    error: error,
  };
};

// PERMISSION LIST

export const getPermissionListAccessLimit = (): ServiceAccessLimitAction => {
  return {
    type: GET_PERMISSION_LIST_ACCESS_LIMIT,
  };
};

export const getPermissionListAccessLimitSuccess = (
  permissionList: PermissionAccessLimit[],
): ServiceAccessLimitAction => {
  return {
    type: GET_PERMISSION_LIST_ACCESS_LIMIT_SUCCESS,
    permissionList: permissionList,
  };
};

export const getPermissionListAccessLimitError = (
  error: ServiceAccessLimitAction['error'],
): ServiceAccessLimitAction => {
  return {
    type: GET_PERMISSION_LIST_ACCESS_LIMIT_ERROR,
    error: error,
  };
};

// CREATE
export const createServiceAccess = (paramsCreate: ServiceAccessLimit): ServiceAccessLimitAction => {
  return {
    type: CREATE_SERVICE_ACCESS,
    paramsCreate: paramsCreate,
  };
};

export const createServiceAccessSuccess = (): ServiceAccessLimitAction => {
  return {
    type: CREATE_SERVICE_ACCESS_SUCCESS,
  };
};

export const createServiceAccessError = (error: ServiceAccessLimitAction['error']): ServiceAccessLimitAction => {
  return {
    type: CREATE_SERVICE_ACCESS_ERROR,
    error: error,
  };
};

// UPDATE
export const updateServiceAccess = (paramsCreate: ServiceAccessLimit): ServiceAccessLimitAction => {
  return {
    type: UPDATE_SERVICE_ACCESS,
    paramsCreate: paramsCreate,
  };
};

export const updateServiceAccessSuccess = (): ServiceAccessLimitAction => {
  return {
    type: UPDATE_SERVICE_ACCESS_SUCCESS,
  };
};

export const updateServiceAccessError = (error: ServiceAccessLimitAction['error']): ServiceAccessLimitAction => {
  return {
    type: UPDATE_SERVICE_ACCESS_ERROR,
    error: error,
  };
};
