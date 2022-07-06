import { CreateGroupRestApiAction, CreateGroupRestApiParams } from '../models';
import {
  CREATE_GROUP_REST_API,
  CREATE_GROUP_REST_API_ERROR,
  CREATE_GROUP_REST_API_SUCCESS,
  SHOW_CREATE_GROUP_REST_API_FORM,
} from '../constants';
import { AppError } from '../../../../models/baseResponse';

export const showCreatApiForm = (show: boolean): CreateGroupRestApiAction => {
  return {
    type: SHOW_CREATE_GROUP_REST_API_FORM,
    show: show,
  };
};

export const createApi = (param: CreateGroupRestApiParams, history: any): CreateGroupRestApiAction => {
  return {
    type: CREATE_GROUP_REST_API,
    params: param,
    history: history,
  };
};

export const createApiSuccess = (): CreateGroupRestApiAction => {
  return {
    type: CREATE_GROUP_REST_API_SUCCESS,
  };
};

export const createApiError = (error: AppError): CreateGroupRestApiAction => {
  return {
    type: CREATE_GROUP_REST_API_ERROR,
    error: error,
  };
};
