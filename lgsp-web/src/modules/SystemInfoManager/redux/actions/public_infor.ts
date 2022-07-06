import { PUBLIC_INFOR, PUBLIC_INFOR_ERROR, PUBLIC_INFOR_SUCCESS, RELOAD_DATA_PUBLIC } from '../constants';
import { PublicInforAction, PublicInforParams } from '../models';

export const publicInfor = (param?: PublicInforParams) => {
  return {
    type: PUBLIC_INFOR,
    param: param, 
  };
};

export const publicInforSuccess = () => {
  return {
    type: PUBLIC_INFOR_SUCCESS,
  };
};

export const publicInforError = (error: PublicInforAction['error']) => {
  return {
    type: PUBLIC_INFOR_ERROR,
    error: error,
  };
};

export const reloadData = (): PublicInforAction => {
  return {
    type: RELOAD_DATA_PUBLIC,
  };
};
