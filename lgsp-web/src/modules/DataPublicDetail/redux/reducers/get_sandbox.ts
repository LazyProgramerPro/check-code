import { GET_SANDBOX, GET_SANDBOX_ERROR, GET_SANDBOX_SUCCESS, RELOAD_DATA_SANDBOX } from '../constanst';
import { GetSandboxAction, GetSandboxState, RenderTokenSandBox } from '../models';
const initData: RenderTokenSandBox = {
  accessToken: '',
  validityTime: 0,
};
const initState: GetSandboxState = {
  loading: false,
  item: initData,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getSandboxState = (
  state = initState,
  { type, payload, error, params }: GetSandboxAction,
): GetSandboxState => {
  switch (type) {
    case GET_SANDBOX: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_SANDBOX_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case GET_SANDBOX_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_SANDBOX: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
