import {
  CREATE_DATA_SERVICE,
  CREATE_DATA_SERVICE_ERROR,
  CREATE_DATA_SERVICE_SUCCESS,
  GET_DETAIL_DATA_SERVICE_UPDATE,
  GET_DETAIL_DATA_SERVICE_UPDATE_ERROR,
  GET_DETAIL_DATA_SERVICE_UPDATE_SUCCESS,
  RESET_CREATED_STATUS,
  RESET_FORM_DATA_SERVICE,
  SET_LOADING,
  SET_SCREEN_NUMBER,
  UPDATE_DATA_SERVICE,
  UPDATE_DATA_SERVICE_ERROR,
  UPDATE_DATA_SERVICE_SUCCESS,
} from '../constant';
import { CreateDataServiceAction, CreateDataServiceParams } from '../models';

export const createDataService = (params: CreateDataServiceParams, history?: any): CreateDataServiceAction => {
  return {
    type: CREATE_DATA_SERVICE,
    params: params,
    history: history,
  };
};

export const createDataServiceSuccess = (idDataServiceCreated: string): CreateDataServiceAction => {
  return {
    type: CREATE_DATA_SERVICE_SUCCESS,
    idDataServiceCreated: idDataServiceCreated,
  };
};

export const createDataServiceError = (error: CreateDataServiceAction['error']): CreateDataServiceAction => {
  return {
    type: CREATE_DATA_SERVICE_ERROR,
    error: error,
  };
};

export const resetFormDataService = () => {
  return {
    type: RESET_FORM_DATA_SERVICE,
  };
};

export const getDetailDataServiceUpdate = (id?: string): CreateDataServiceAction => {
  return {
    type: GET_DETAIL_DATA_SERVICE_UPDATE,
    id: id,
  };
};

export const getDetailDataServiceUpdateSuccess = (params: CreateDataServiceParams): CreateDataServiceAction => {
  return {
    type: GET_DETAIL_DATA_SERVICE_UPDATE_SUCCESS,
    params: params,
  };
};

export const getDetailDataServiceUpdateError = (error: CreateDataServiceAction['error']): CreateDataServiceAction => {
  return {
    type: GET_DETAIL_DATA_SERVICE_UPDATE_ERROR,
    error,
  };
};

// update

export const updateDataService = (params: CreateDataServiceParams, history?: any): CreateDataServiceAction => {
  return {
    type: UPDATE_DATA_SERVICE,
    params: params,
    history: history,
  };
};

export const updateDataServiceSuccess = () => {
  return {
    type: UPDATE_DATA_SERVICE_SUCCESS,
  };
};

export const updateDataServiceError = (error: CreateDataServiceAction['error']): CreateDataServiceAction => {
  return {
    type: UPDATE_DATA_SERVICE_ERROR,
    error: error,
  };
};

export const setScreenNumber = (screen: number): CreateDataServiceAction => {
  return {
    type: SET_SCREEN_NUMBER,
    screen: screen,
  };
};

export const resetCreateStatus = (): CreateDataServiceAction => ({
  type: RESET_CREATED_STATUS,
});

export const setLoading = (loading: boolean): CreateDataServiceAction => ({
  type: SET_LOADING,
  loading,
});
