import { DELETE_INFOR, DELETE_INFOR_ERROR, DELETE_INFOR_SUCCESS, RELOAD_INFOR } from '../constants';
import { DeleteInforAction, DeleteInforParam } from '../models';

export const deleteInfor = (param?: DeleteInforParam) => {
  return {
    type: DELETE_INFOR,
    param: param,
  };
};

export const deleteInforSuccess = () => {
  return {
    type: DELETE_INFOR_SUCCESS,
  };
};

export const deleteInforError = (error: DeleteInforAction['error']) => {
  return {
    type: DELETE_INFOR_ERROR,
    error: error,
  };
};

export const reloadData = (): DeleteInforAction => {
  return {
    type: RELOAD_INFOR,
  };
};
