import {
  LOG_DATA_SERVICE,
  LOG_DATA_SERVICE_ERROR,
  LOG_DATA_SERVICE_SUCCESS,
  RELOAD_LOG_DATA_SERVICE,
} from '../constants';
import { GetDataServiceAction, GetDataServiceState } from '../models';

const initState: GetDataServiceState = {
  loading: false,
  item: 0,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getLogDataServiceState = (
  state = initState,
  { type, payload, error, params }: GetDataServiceAction,
): GetDataServiceState => {
  switch (type) {
    case LOG_DATA_SERVICE: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case LOG_DATA_SERVICE_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case LOG_DATA_SERVICE_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_LOG_DATA_SERVICE: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
