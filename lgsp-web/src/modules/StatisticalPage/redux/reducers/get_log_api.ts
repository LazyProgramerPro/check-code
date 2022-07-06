import { LOG_API, LOG_API_ERROR, LOG_API_SUCCESS, RELOAD_LOG_API } from '../constants';
import { GetApiAction, GetApiState } from '../models';

const initState: GetApiState = {
  loading: false,
  item: 0,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getLogApiState = (state = initState, { type, payload, error, params }: GetApiAction): GetApiState => {
  switch (type) {
    case LOG_API: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case LOG_API_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case LOG_API_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_LOG_API: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
