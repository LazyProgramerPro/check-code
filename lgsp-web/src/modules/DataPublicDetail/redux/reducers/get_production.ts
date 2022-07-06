import { GET_PRODUCTION, GET_PRODUCTION_ERROR, GET_PRODUCTION_SUCCESS, RELOAD_DATA_PRODUCTION } from '../constanst';
import { GetProductionState, Production, GetProductionAction } from '../models';

const initProduc: Production = {
  id: '',
  applicationTokenExpiryTime: '',
  consumerSecret: '',
  userAccessTokenExpiryTime: '',
  password_grant_type: '',
  refreshTime: '',
  expiryTime: '',
  consumerKey: '',
  client_credential: '',
};

const initState: GetProductionState = {
  loading: false,
  item: initProduc,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getProductionState = (
  state = initState,
  { type, payload, error, params }: GetProductionAction,
): GetProductionState => {
  switch (type) {
    case GET_PRODUCTION: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_PRODUCTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case GET_PRODUCTION_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_PRODUCTION: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
