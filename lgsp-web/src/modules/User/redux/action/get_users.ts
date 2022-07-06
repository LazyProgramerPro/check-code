import { GET_ALL_USERS, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS, LOAD_PAGE, RELOAD_DATA_USERS } from '../constant';
import { GetUserAction, GetUserParams } from '../models';

export const getAllUsers = (params: GetUserParams): GetUserAction => {
  return {
    type: GET_ALL_USERS,
    params: params,
  };
};

export const getAllUsersSuccess = (resp: any): GetUserAction => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: resp,
  };
};

export const getAllUsersError = (error: GetUserAction['error']): GetUserAction => {
  return {
    type: GET_ALL_USERS_ERROR,
    error: error,
  };
};

export const reloadData = (): GetUserAction => {
  return {
    type: RELOAD_DATA_USERS,
  };
};

export const loadPage = () => {
  return {
    type: LOAD_PAGE,
  };
};
