import { CREATE_CONTENT, CREATE_CONTENT_ERROR, CREATE_CONTENT_SUCCESS, SHOW_CREATE } from '../constants';
import { CreateContentAction, CreateContentState } from '../models';

const initState: CreateContentState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    content: '',
  },
};

export const createState = (
  state = initState,
  { type, show, params, error }: CreateContentAction,
): CreateContentState => {
  switch (type) {
    case SHOW_CREATE:
      return {
        ...state,
        show: !!show,
      };

    case CREATE_CONTENT:
      return {
        ...state,
        params: {
          ...state.params,
          ...params,
        },
        loading: true,
      };

    case CREATE_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_CONTENT_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
