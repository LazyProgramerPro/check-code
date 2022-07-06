import { CREATE_CACHING, CREATE_CACHING_ERROR, CREATE_CACHING_SUCCESS, SHOW_CREATE } from '../constants';
import { CreateCachingAction, CreateCachingState } from '../models';

const initState: CreateCachingState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    refreshTime: '',
  },
};

export const createState = (
  state = initState,
  { type, show, params, error }: CreateCachingAction,
): CreateCachingState => {
  switch (type) {
    case SHOW_CREATE:
      return {
        ...state,
        show: !!show,
      };

    case CREATE_CACHING:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case CREATE_CACHING_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_CACHING_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
