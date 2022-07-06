import { CREATE_GATEWAY, CREATE_GATEWAY_ERROR, CREATE_GATEWAY_SUCCESS, SHOW_CREATE } from '../constanst';
import { CreateGatewayAction, CreateGatewayState, HostListParams } from '../models';

export const initHostList: HostListParams = {
  context: '',
  host: '',
  httpPort: 0,
  httpsPort: 0,
};
const initState: CreateGatewayState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    description: '',
    name: '',
    hostList: [] as typeof initHostList[],
    displayName: '',
  },
};

export const createState = (
  state = initState,
  { type, show, params, error }: CreateGatewayAction,
): CreateGatewayState => {
  switch (type) {
    case SHOW_CREATE:
      return {
        ...state,
        show: !!show,
      };

    case CREATE_GATEWAY:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case CREATE_GATEWAY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_GATEWAY_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
