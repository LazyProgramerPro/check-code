import {
  CLOSE_FORM_ADD_QUERY,
  CREATE_QUERY_PARAM,
  DELETE_QUERY_PARAM,
  EDIT_QUERY_PARAM,
  OPEN_FORM_ADD_QUERY,
  RESET_QUERY_PARAM,
  SAVE_QUERY_PARAM,
  SET_PAGE_QUERY_TABLE,
  SET_QUERY_PARAM1,
  UPDATE_QUERY_PARAM,
} from '../constant';
import { CreateQueryAction, QueryEntity } from '../models';

export const openFormAddQuery = (isUpdate?: boolean): CreateQueryAction => {
  return {
    type: OPEN_FORM_ADD_QUERY,
    isUpdate: isUpdate ? isUpdate : false,
  };
};

export const closeFormAddQuery = (): any => {
  return {
    type: CLOSE_FORM_ADD_QUERY,
  };
};

export const createQuery = (params: QueryEntity): CreateQueryAction => {
  return {
    type: CREATE_QUERY_PARAM,
    params: params,
  };
};

export const deleteQuery = (queryName: string): CreateQueryAction => {
  return {
    type: DELETE_QUERY_PARAM,
    queryName: queryName,
  };
};

export const editQuery = (params: QueryEntity): CreateQueryAction => {
  return {
    type: EDIT_QUERY_PARAM,
    params: params,
  };
};

export const saveEditQuery = (params: QueryEntity): CreateQueryAction => {
  return {
    type: SAVE_QUERY_PARAM,
    params: params,
  };
};

export const setQueryParams = (queries: any[]): CreateQueryAction => {
  return {
    type: SET_QUERY_PARAM1,
    queries,
  };
};

export const UpdateQuery = (updateQuery: QueryEntity[]): CreateQueryAction => {
  console.log('updateQuery: ' + JSON.stringify(updateQuery));
  return {
    type: UPDATE_QUERY_PARAM,
    updateQuery: updateQuery,
  };
};

export const resetQuery = () => {
  return {
    type: RESET_QUERY_PARAM,
  };
};

export const setPageQueryTable = (page: number) => {
  return {
    type: SET_PAGE_QUERY_TABLE,
    page: page,
  };
};

//
// export const onDataSourceDeleted = (action: CreateDataSourceAction): CreateQueryAction => ({
//   type: Q_DATASOURCE_DELETED,
//   q_ds_action: action
// });
