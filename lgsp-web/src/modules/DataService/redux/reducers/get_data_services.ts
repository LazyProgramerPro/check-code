import { GetDataServiceAction, GetDataServiceState } from '../models';
import {
  GET_ALL_DATA_SERVICE,
  GET_ALL_DATA_SERVICE_ERROR,
  GET_ALL_DATA_SERVICE_SUCCESS,
  LOGIC_REJECT,
  RELOAD_DATA_DATA_SERVICE,
} from '../constants';

const initState: GetDataServiceState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getState = (
  state = initState,
  { type, payload, error, params }: GetDataServiceAction,
): GetDataServiceState => {
  switch (type) {
    case GET_ALL_DATA_SERVICE:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case GET_ALL_DATA_SERVICE_SUCCESS:
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

    case GET_ALL_DATA_SERVICE_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case RELOAD_DATA_DATA_SERVICE:
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };

    default:
      return state;
  }
};
