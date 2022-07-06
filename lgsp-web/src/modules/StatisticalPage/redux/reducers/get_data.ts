import { LOG_DATA, LOG_DATA_ERROR, LOG_DATA_SUCCESS, RELOAD_LOG_DATA } from '../constants';
import { DataStatiscal, DataStatiscalAction, DataStatiscalState } from '../models';

const initData: DataStatiscal = {
  users: 0,
  services: 0,
  dataServices: 0,
};
const initState: DataStatiscalState = {
  loading: false,
  item: initData,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getData = (
  state = initState,
  { type, payload, error, params }: DataStatiscalAction,
): DataStatiscalState => {
  switch (type) {
    case LOG_DATA: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case LOG_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case LOG_DATA_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_LOG_DATA: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
