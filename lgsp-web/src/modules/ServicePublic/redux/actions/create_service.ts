import { CREATE_SERVICE, CREATE_SERVICE_ERROR, CREATE_SERVICE_SUCCESS, LOAD_PAGE, SHOW_CREATE } from '../constants';
import { CreateServiceAction, CreateServiceParams } from '../models';
export const showCreateServiceForm = (show: boolean): CreateServiceAction => {
  return {
    type: SHOW_CREATE,
    show: show,
  };
};

export const createService = (params: CreateServiceParams): CreateServiceAction => {
  return {
    type: CREATE_SERVICE,
    params: params,
  };
};

export const createServiceSuccess = () => {
  return {
    type: CREATE_SERVICE_SUCCESS,
  };
};

export const createServiceError = (error: CreateServiceAction['error']): CreateServiceAction => {
  return {
    type: CREATE_SERVICE_ERROR,
    error: error,
  };
};
