import { GetLogAction, GetLogState, LogData } from '../models';
import { GET_LOG, GET_LOG_SUCCESS, GET_LOG_ERROR, RELOAD_DATA } from '../constants';
export const initData: LogData = {
  code: 0,
  content: '',
  provider: '',
  time: '',
  type: '',
};
const initState: GetLogState = {
  loading: false,
  rows: [] as typeof initData[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getState = (state = initState, { type, payload, error, params }: GetLogAction): GetLogState => {
  switch (type) {
    case GET_LOG: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_LOG_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows:
          payload?.rows.map((item, index) => {
            return {
              ...item,
              index,
            };
          }) || [],
        total: payload?.total || 0,
      };
    }

    case GET_LOG_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
