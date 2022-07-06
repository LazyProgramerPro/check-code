import {
  DELETE_DATA_SERVICE,
  DELETE_DATA_SERVICE_ERROR,
  DELETE_DATA_SERVICE_SUCCESS,
} from 'src/modules/DataService/redux/constants';
import { CLICK_DELETE_BUTTON } from '../constant';
import { DeleteDataServiceAction, DeleteDataServiceState } from '../models';

const initState: DeleteDataServiceState = {
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
export const deleteReducers = (
  state = initState,
  { type, show, message, canDelete, param, error }: DeleteDataServiceAction,
) => {
  switch (type) {
    case DELETE_DATA_SERVICE: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case DELETE_DATA_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_DATA_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
