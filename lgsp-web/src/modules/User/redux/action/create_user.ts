import {
  ACCEPT_USERS,
  ACCEPT_USERS_ERROR,
  ACCEPT_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  REJECT_USERS,
  REJECT_USERS_ERROR,
  REJECT_USERS_SUCCESS,
  SHOW_CREATE_USER_FORM,
} from '../constant';
import { CreateUserAction, CreateUserParams, RejectUserParam } from '../models';

export const showCreateUserForm = (show: boolean): CreateUserAction => {
  return {
    type: SHOW_CREATE_USER_FORM,
    show: show,
  };
};

export const createUser = (params: CreateUserParams): CreateUserAction => {
  return {
    type: CREATE_USER,
    params: params,
  };
};

export const createUserSuccess = () => {
  return {
    type: CREATE_USER_SUCCESS,
  };
};

export const createUserError = (error: CreateUserAction['error']): CreateUserAction => {
  return {
    type: CREATE_USER_ERROR,
    error: error,
  };
};

// ACCEPT

export const acceptUser = (accountId: string): CreateUserAction => {
  return {
    type: ACCEPT_USERS,
    accountId: accountId,
  };
};

export const acceptUserSuccess = () => {
  return {
    type: ACCEPT_USERS_SUCCESS,
  };
};

export const acceptUserError = (error: CreateUserAction['error']): CreateUserAction => {
  return {
    type: ACCEPT_USERS_ERROR,
    error: error,
  };
};

//REJECT

export const rejectUser = (rejectParam: RejectUserParam): CreateUserAction => {
  return {
    type: REJECT_USERS,
    rejectParam: rejectParam,
  };
};

export const rejectUserSuccess = () => {
  return {
    type: REJECT_USERS_SUCCESS,
  };
};

export const rejectUserError = (error: CreateUserAction['error']): CreateUserAction => {
  return {
    type: REJECT_USERS_ERROR,
    error: error,
  };
};
