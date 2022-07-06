import { DELETE_INFOR, DELETE_INFOR_ERROR, DELETE_INFOR_SUCCESS } from '../constants';
import { DeleteInforAction, DeleteInforState } from '../models';

const initState: DeleteInforState = {
  loading: false,
  show: false,
  canDelete: true,
  param: {
    id: '',
  },
  message: '',
  error: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export const deleteState = (state = initState, { type, param, error }: DeleteInforAction) => {
  switch (type) {
    case DELETE_INFOR: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case DELETE_INFOR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_INFOR_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
