import { CreateResourceAction, CreateResourceState } from '../models';
import { SHOW_CREATE, CREATE_RESOURCE, CREATE_RESOURCE_SUCCESS, CREATE_RESOURCE_ERROR } from '../constanst';
const initState: CreateResourceState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    dataAmount: 0,
    dataUnit: '',
    description: '',
    name: '',
    requestCount: 0,
    timeUnit: '',
    type: '',
    unitTime: 0,
  },
};

export const createState = (
  state = initState,
  { type, show, params, error }: CreateResourceAction,
): CreateResourceState => {
  switch (type) {
    case SHOW_CREATE:
      return {
        ...state,
        show: !!show,
      };

    case CREATE_RESOURCE:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case CREATE_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_RESOURCE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
