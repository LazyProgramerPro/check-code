import { GET_ACCOUNT, GET_ACCOUNT_ERROR, GET_ACCOUNT_SUCCESS, RELOAD_DATA_ACCOUNT } from '../constants';
import { GetAccountAction, GetAccountState } from '../models';

const initState: GetAccountState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getAccountState = (
  state = initState,
  { type, payload, error, params }: GetAccountAction,
): GetAccountState => {
  switch (type) {
    case GET_ACCOUNT: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_ACCOUNT_SUCCESS: {
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

    case GET_ACCOUNT_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_ACCOUNT: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
