import { SHOW_DATA, UPDATE_CONTENT, UPDATE_CONTENT_ERROR, UPDATE_CONTENT_SUCCESS } from '../constants';
import { UpdateContentAction, UpdateContentState } from '../models';

const initState: UpdateContentState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    id: '',
    content: '',
  },
  originData: undefined,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  { type, show, originData, params, error }: UpdateContentAction,
): UpdateContentState => {
  switch (type) {
    case SHOW_DATA:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case UPDATE_CONTENT:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case UPDATE_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_CONTENT_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
