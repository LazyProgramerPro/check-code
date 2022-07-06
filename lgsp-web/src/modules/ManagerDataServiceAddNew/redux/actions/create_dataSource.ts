import {
  CHECKING_CONNECTION,
  CLOSE_FORM_ADD,
  CREATE_DATA_SOURCE,
  DELETE_DATA_SOURCE,
  EDIT_DATA_SOURCE,
  OPEN_FORM_ADD,
  RESET_DATA_SOURCE,
  SAVE_EDIT_DATA_SOURCE,
  SET_PAGE_DATA_SOURCE_TABLE,
  // SET_CREATE_DATA_SOURCE,
  UPDATE_DATA_SOURCE,
} from '../constant';
import { CreateDataSourceAction, CreateDataSourceParams } from '../models';

export const openFormAdd = (isUpdate?: boolean): CreateDataSourceAction => {
  return {
    type: OPEN_FORM_ADD,
    isUpdate: isUpdate ? isUpdate : false,
  };
};

export const closeFormAdd = (): any => {
  return {
    type: CLOSE_FORM_ADD,
  };
};

export const createDataSource = (params: CreateDataSourceParams): CreateDataSourceAction => {
  return {
    type: CREATE_DATA_SOURCE,
    params: params,
  };
};

export const checkingConnection = (params: any): CreateDataSourceAction => {
  return {
    type: CHECKING_CONNECTION,
    params: params,
  };
};

// export const setCreateDataSources = (dataSources: CreateDataSourceParams[]): CreateDataSourceAction => {
//   return {
//     type: SET_CREATE_DATA_SOURCE,
//     datasourceForCreate: dataSources
//   }
// }

export const deleteDataSource = (nameDataSource: string): CreateDataSourceAction => {
  return {
    type: DELETE_DATA_SOURCE,
    nameDataSource: nameDataSource,
  };
};

export const editDataSource = (params: CreateDataSourceParams): CreateDataSourceAction => {
  return {
    type: EDIT_DATA_SOURCE,
    params: params,
  };
};

export const saveEditDataSource = (params: CreateDataSourceParams): CreateDataSourceAction => {
  return {
    type: SAVE_EDIT_DATA_SOURCE,
    params: params,
  };
};

export const UpdateDataSource = (dataSourceConfigsUpdate: CreateDataSourceParams[]): CreateDataSourceAction => {
  return {
    type: UPDATE_DATA_SOURCE,
    dataSourceConfigsUpdate: dataSourceConfigsUpdate,
  };
};

export const resetDataSource = () => {
  return {
    type: RESET_DATA_SOURCE,
  };
};

export const setPageDataSourceTable = (page: number) => {
  return {
    type: SET_PAGE_DATA_SOURCE_TABLE,
    page: page,
  };
};
