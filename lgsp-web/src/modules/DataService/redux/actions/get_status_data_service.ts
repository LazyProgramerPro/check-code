import { GET_APPROVE, GET_APPROVE_ERROR, GET_APPROVE_SUCCESS, RELOAD_DATA } from '../constants';
import { ApproveAction, ApproveParams } from '../models';

export const statusService = (param?: ApproveParams) => {
  return {
    type: GET_APPROVE,
    param: param,
  };
};

export const statusServiceSuccess = () => {
  return {
    type: GET_APPROVE_SUCCESS,
  };
};

export const statusServiceError = (error: ApproveAction['error']) => {
  return {
    type: GET_APPROVE_ERROR,
    error: error,
  };
};

export const reloadData = (): ApproveAction => {
  return {
    type: RELOAD_DATA,
  };
};
