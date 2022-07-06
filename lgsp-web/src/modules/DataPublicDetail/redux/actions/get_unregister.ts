import { RELOAD_SUB_UNREGISTER, SUB_UNREGISTER, SUB_UNREGISTER_ERROR, SUB_UNREGISTER_SUCCESS } from '../constanst';
import { GetUnRegisterAction, GetUnRegisterParams } from '../models';

export const getUnRegister = (param?: GetUnRegisterParams) => {
  return {
    type: SUB_UNREGISTER,
    param: param,
  };
};

export const getUnRegisterSuccess = () => {
  return {
    type: SUB_UNREGISTER_SUCCESS,
  };
};

export const getUnRegisterError = (error: GetUnRegisterAction['error']) => {
  return {
    type: SUB_UNREGISTER_ERROR,
    error: error,
  };
};

export const reloadData = (): GetUnRegisterAction => {
  return {
    type: RELOAD_SUB_UNREGISTER,
  };
};
