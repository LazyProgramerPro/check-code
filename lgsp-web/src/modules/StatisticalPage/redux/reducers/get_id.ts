import { GET_ID, GET_ID_ERROR, GET_ID_SUCCESS, RELOAD_DATA_ID } from '../constants';
import { GetIdAction, GetIdState } from '../models';

const initState: GetIdState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getIdState = (state = initState, { type, payload, error, params }: GetIdAction): GetIdState => {
  switch (type) {
    case GET_ID: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_ID_SUCCESS: {
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

    case GET_ID_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_ID: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
