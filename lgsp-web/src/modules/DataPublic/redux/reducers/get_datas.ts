import { GET_ALL_DATAS, GET_ALL_DATAS_ERROR, GET_ALL_DATAS_SUCCESS, RELOAD_DATA } from '../constant';
import { GetDataAction, GetDataState } from '../models';

const initState: GetDataState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getState = (state = initState, { type, payload, error, params }: GetDataAction): GetDataState => {
  switch (type) {
    case GET_ALL_DATAS: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_ALL_DATAS_SUCCESS: {
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

    case GET_ALL_DATAS_ERROR: {
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
