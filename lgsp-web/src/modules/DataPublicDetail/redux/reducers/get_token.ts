import { GET_TOKEN, GET_TOKEN_ERROR, GET_TOKEN_SUCCESS, RELOAD_DATA_TOKEN } from '../constanst';
import { GetTokenAction, GetTokenState, RenderToken } from '../models';

const initData: RenderToken = {
  accessToken: '',
  validityTime: 0,
};
const initState: GetTokenState = {
  loading: false,
  item: initData,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getTokenState = (state = initState, { type, payload, error, params }: GetTokenAction): GetTokenState => {
  switch (type) {
    case GET_TOKEN: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case GET_TOKEN_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_TOKEN: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
