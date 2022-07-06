import { GET_LIST_DATA_SERVICE, GET_LIST_DATA_SERVICE_ERROR, GET_LIST_DATA_SERVICE_SUCCESS } from '../constant';
import { GetListDataServiceAction, GetListDataServiceState } from '../models';

const initState: GetListDataServiceState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getReducers = (
  state = initState,
  { type, payload, error, params }: GetListDataServiceAction,
): GetListDataServiceState => {
  switch (type) {
    case GET_LIST_DATA_SERVICE: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_LIST_DATA_SERVICE_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows: payload?.rows || [],
        total: payload?.total || 0,
      };
    }

    case GET_LIST_DATA_SERVICE_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
};
