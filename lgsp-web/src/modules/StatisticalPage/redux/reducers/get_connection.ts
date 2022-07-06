import { LOG_CONNECTION, LOG_CONNECTION_ERROR, LOG_CONNECTION_SUCCESS, RELOAD_LOG_CONNECTION } from '../constants';
import { Data, DataItem, GetDataAction, GetDataState } from '../models';

const initData: Data = {
  x: '',
  y: 0,
};
// const initSuccess: SuccessData = {
//   rows: [] as typeof initData[],
// };

// const initFailed: FailedData = {
//   rows: [] as typeof initData[],
// };

const initDataItem: DataItem = {
  successData: [] as typeof initData[],
  failedData: [] as typeof initData[],
};

const initState: GetDataState = {
  loading: false,
  item: initDataItem,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getLogConnectionState = (
  state = initState,
  { type, payload, error, params }: GetDataAction,
): GetDataState => {
  switch (type) {
    case LOG_CONNECTION: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case LOG_CONNECTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case LOG_CONNECTION_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_LOG_CONNECTION: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
