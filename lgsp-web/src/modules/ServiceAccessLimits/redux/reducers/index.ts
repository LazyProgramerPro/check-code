import { combineReducers } from 'redux';
import {
  DELETE_SERVICE_ACCESS,
  DELETE_SERVICE_ACCESS_ERROR,
  DELETE_SERVICE_ACCESS_SUCCESS,
  GET_LIST_SERVICE_ACCESS,
  GET_LIST_SERVICE_ACCESS_ERROR,
  GET_LIST_SERVICE_ACCESS_SUCCESS,
  GET_PERMISSION_LIST_ACCESS_LIMIT,
  GET_PERMISSION_LIST_ACCESS_LIMIT_ERROR,
  GET_PERMISSION_LIST_ACCESS_LIMIT_SUCCESS,
} from '../constant';
import {
  PermissionAccessLimit,
  ServiceAccessLimit,
  ServiceAccessLimitAction,
  ServiceAccessLimitState,
} from './../models';

const initPermissionAccessLimit: PermissionAccessLimit = {
  id: '',
  name: '',
  organization: undefined,
  users: undefined,
  createTime: undefined,
};

const initServiceAccessLimit: ServiceAccessLimit = {
  dataAmount: 0,
  dataUnit: '',
  description: '',
  name: '',
  permissionType: 'none',
  requestCount: 0,
  permissions: [],
  timeUnit: 'min',
  type: 'bandwidthVolume',
  unitTime: 0,
};

const initState: ServiceAccessLimitState = {
  loading: false,
  show: false,
  params: undefined,
  servicesAccess: [] as typeof initServiceAccessLimit[],
  servicesAccessEdit: initServiceAccessLimit,
  error: undefined,
  permissionList: [] as typeof initPermissionAccessLimit[],
  total: 0,
};

const ServicesAccessLimitsReducer = (
  state = initState,
  { type, params, error, id, payload, permissionList }: ServiceAccessLimitAction,
): ServiceAccessLimitState => {
  switch (type) {
    case GET_LIST_SERVICE_ACCESS: {
      return {
        ...state,
        loading: true,
        params: params,
      };
    }

    case GET_LIST_SERVICE_ACCESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        servicesAccess: payload?.rows,
        total: payload?.total,
      };
    }

    case GET_LIST_SERVICE_ACCESS_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    // DELETE

    case DELETE_SERVICE_ACCESS: {
      return {
        ...state,
        loading: true,
      };
    }

    case DELETE_SERVICE_ACCESS_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case DELETE_SERVICE_ACCESS_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    // GET_PERMISSION_LIST_ACCESS_LIMIT

    case GET_PERMISSION_LIST_ACCESS_LIMIT: {
      return {
        ...state,
        loading: true,
        permissionList: permissionList,
      };
    }

    case GET_PERMISSION_LIST_ACCESS_LIMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        permissionList: permissionList,
      };
    }

    case GET_PERMISSION_LIST_ACCESS_LIMIT_ERROR: {
      return {
        ...state,
        error,
        loading: false,
        permissionList: [],
      };
    }

    default:
      return state;
  }
};

export interface ServicesAccessLimitsModuleState {
  servicesAccessLimits: ServiceAccessLimitState;
}

export default combineReducers<ServicesAccessLimitsModuleState>({
  servicesAccessLimits: ServicesAccessLimitsReducer,
});
