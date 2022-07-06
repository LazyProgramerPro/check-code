import { CREATE_SERVICE, CREATE_SERVICE_ERROR, CREATE_SERVICE_SUCCESS, LOAD_PAGE, SHOW_CREATE } from '../constants';
import { CreateServiceAction, CreateServiceState } from '../models';

const initState: CreateServiceState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    description: '',
    name: '',
  },
};

export const createState = (
  state = initState,
  { type, show, params, error }: CreateServiceAction,
): CreateServiceState => {
  switch (type) {
    case SHOW_CREATE:
      return {
        ...state,
        show: !!show,
      };

    case CREATE_SERVICE:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
