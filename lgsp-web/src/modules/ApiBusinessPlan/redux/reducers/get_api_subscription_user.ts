import { GetApiSubscriptionUserAction, GetApiSubscriptionUserEntity, GetApiSubscriptionUserState } from '../models';
import {
  GET_API_SUBSCRIPTION_USER,
  GET_API_SUBSCRIPTION_USER_ERROR,
  GET_API_SUBSCRIPTION_USER_SUCCESS,
  RELOAD_API_POLICY,
  RELOAD_API_SUBSCRIPTION_USER,
} from '../constants';

const initState: GetApiSubscriptionUserState = {
  loading: false,
  error: undefined,
  flag_reload: false,
  params: undefined,
  rows: [],
  total: 0,
};

export default (
  state = initState,
  { type, params, payload, error }: GetApiSubscriptionUserAction,
): GetApiSubscriptionUserState => {
  switch (type) {
    case GET_API_SUBSCRIPTION_USER:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case GET_API_SUBSCRIPTION_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        rows: payload?.rows || [],
        total: payload?.total,
      };

    case GET_API_SUBSCRIPTION_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    case RELOAD_API_SUBSCRIPTION_USER:
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };

    default:
      return state;
  }
};
