import { RELOAD_DATA_CATEGORY } from 'src/modules/DataPublic/redux/constant';
import { LOG_USER, LOG_USER_ERROR, LOG_USER_SUCCESS } from '../constants';
import { GetLogUserAction, GetLogUserState } from '../models';

const initState: GetLogUserState = {
  loading: false,
  item: 0,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getLogUserState = (
  state = initState,
  { type, payload, error, params }: GetLogUserAction,
): GetLogUserState => {
  switch (type) {
    case LOG_USER: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case LOG_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case LOG_USER_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_CATEGORY: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
