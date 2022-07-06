import { DELETE_SERVICE, DELETE_SERVICE_ERROR, DELETE_SERVICE_SUCCESS, LOAD_PAGE } from '../constants';
import { DeleteServiceAction, DeleteServiceState } from '../models';

const initState: DeleteServiceState = {
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
export const deleteState = (state = initState, { type, param, error }: DeleteServiceAction) => {
  switch (type) {
    case DELETE_SERVICE: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
