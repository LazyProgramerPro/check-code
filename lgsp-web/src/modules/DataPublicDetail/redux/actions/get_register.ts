import { RELOAD_SUB, SUB_REGISTER, SUB_REGISTER_ERROR, SUB_REGISTER_SUCCESS } from '../constanst';
import { GetRegisterAction, GetRegisterParams } from '../models';

export const getRegister = (param?: GetRegisterParams) => {
  return {
    type: SUB_REGISTER,
    param: param,
  };
};

export const getRegisterSuccess = () => {
  return {
    type: SUB_REGISTER_SUCCESS,
  };
};

export const getRegisterError = (error: GetRegisterAction['error']) => {
  return {
    type: SUB_REGISTER_ERROR,
    error: error,
  };
};

export const reloadData = (): GetRegisterAction => {
  return {
    type: RELOAD_SUB,
  };
};
