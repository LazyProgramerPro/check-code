import { GET_GATEWAY, GET_GATEWAY_ERROR, GET_GATEWAY_SUCCESS, LOAD_PAGE, RELOAD_DATA_GATEWAY } from '../constanst';
import { DataGateway, DataHostList, GetDataGatewayAction, GetDataGatewayState } from '../models';

export const initHostList: DataHostList = {
  host: '',
  context: '',
  httpPort: 0,
  httpsPort: 0,
};
export const initDataGateway: DataGateway = {
  id: '',
  name: '',
  displayName: '',
  description: '',
  hostList: [] as typeof initHostList[],
};
const initState: GetDataGatewayState = {
  loading: false,
  rows: [] as typeof initDataGateway[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getDataGatewayState = (
  state = initState,
  { type, payload, error, params }: GetDataGatewayAction,
): GetDataGatewayState => {
  switch (type) {
    case GET_GATEWAY: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_GATEWAY_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows: payload?.rows || [],
        total: payload?.total || 0,
      };
    }

    case GET_GATEWAY_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_GATEWAY: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    case LOAD_PAGE: {
      return {
        ...state,
        load_page: !state.load_page,
      };
    }
    default:
      return state;
  }
};
