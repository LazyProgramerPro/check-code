import {
  CLOSE_FORM_ADD_TASK,
  CREATE_TASK,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  GET_LIST_DATA_SERVICE_TASK,
  GET_LIST_DATA_SERVICE_TASK_ERROR,
  GET_LIST_DATA_SERVICE_TASK_SUCCESS,
  GET_LIST_OPERATION,
  GET_LIST_OPERATION_ERROR,
  GET_LIST_OPERATION_SUCCESS,
  GET_LIST_TASK,
  GET_LIST_TASK_ERROR,
  GET_LIST_TASK_SUCCESS,
  LOAD_PAGE,
  OPEN_FORM_ADD_TASK,
  RELOAD_LIST_DATA,
} from '../constant';
import { GetListTaskParams, TaskAction, TaskParams } from '../models';

export const openFormAddTask = (isUpdate?: boolean): TaskAction => {
  return {
    type: OPEN_FORM_ADD_TASK,
    isUpdate: isUpdate ? isUpdate : false,
  };
};

export const closeFormAddTask = (): any => {
  return {
    type: CLOSE_FORM_ADD_TASK,
  };
};

export const getListTask = (paramsGetList: GetListTaskParams): TaskAction => {
  return {
    type: GET_LIST_TASK,
    paramsGetList: paramsGetList,
  };
};

export const getListTaskSuccess = (params: any): TaskAction => {
  return {
    type: GET_LIST_TASK_SUCCESS,
    params: params,
  };
};

export const getListTaskError = (error: TaskAction['error']): TaskAction => {
  return {
    type: GET_LIST_TASK_ERROR,
    error: error,
  };
};

export const reloadData = (): TaskAction => {
  return {
    type: RELOAD_LIST_DATA,
  };
};

export const loadPage = () => {
  return {
    type: LOAD_PAGE,
  };
};

// getListDataService

export const getListDataService = (paramsGetList: GetListTaskParams): TaskAction => {
  return {
    type: GET_LIST_DATA_SERVICE_TASK,
    paramsGetList: paramsGetList,
  };
};

export const getListDataServiceSuccess = (listDataService: any): TaskAction => {
  return {
    type: GET_LIST_DATA_SERVICE_TASK_SUCCESS,
    listDataService: listDataService,
  };
};

export const getListDataServiceError = (error: TaskAction['error']): TaskAction => {
  return {
    type: GET_LIST_DATA_SERVICE_TASK_ERROR,
    error: error,
  };
};

// getListOperation

export const getListOperation = (dataServiceId: string): TaskAction => {
  return {
    type: GET_LIST_OPERATION,
    dataServiceId: dataServiceId,
  };
};

export const getListOperationSuccess = (listOperation: any): TaskAction => {
  return {
    type: GET_LIST_OPERATION_SUCCESS,
    listOperation: listOperation,
  };
};

export const getListOperationError = (error: TaskAction['error']): TaskAction => {
  return {
    type: GET_LIST_OPERATION_ERROR,
    error: error,
  };
};

// CREATE
export const createTask = (paramCreate: TaskParams): TaskAction => {
  return {
    type: CREATE_TASK,
    paramCreate: paramCreate,
  };
};

export const createTaskSuccess = (): TaskAction => {
  return {
    type: CREATE_TASK_SUCCESS,
  };
};

export const createTaskError = (error: TaskAction['error']): TaskAction => {
  return {
    type: CREATE_TASK_ERROR,
    error: error,
  };
};
