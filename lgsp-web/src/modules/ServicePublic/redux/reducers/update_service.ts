import { SHOW_UPDATE_SERVICE_FORM, UPDATE_SERVICE, UPDATE_SERVICE_ERROR, UPDATE_SERVICE_SUCCESS } from '../constants';
import { UpdateServiceAction, UpdateServiceState } from '../models';

const initState: UpdateServiceState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    categoryId: '',
    description: '',
    name: '',
  },
  originData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  { type, show, originData, params, error }: UpdateServiceAction,
): UpdateServiceState => {
  switch (type) {
    case SHOW_UPDATE_SERVICE_FORM:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case UPDATE_SERVICE:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
