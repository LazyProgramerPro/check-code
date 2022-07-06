import { SHOW_UPDATE_GATEWAY_FORM, UPDATE_GATEWAY, UPDATE_GATEWAY_ERROR, UPDATE_GATEWAY_SUCCESS } from '../constanst';
import { HostListParams, UpdateGatewayAction, UpdateGatewayState } from '../models';

export const initHostList: HostListParams = {
  context: '',
  host: '',
  httpPort: 0,
  httpsPort: 0,
};
const initState: UpdateGatewayState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    hostList: [] as typeof initHostList[],
    description: '',
    name: '',
    displayName: '',
    gatewayId: '',
  },
  originData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  { type, show, originData, params, error }: UpdateGatewayAction,
): UpdateGatewayState => {
  switch (type) {
    case SHOW_UPDATE_GATEWAY_FORM:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case UPDATE_GATEWAY:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case UPDATE_GATEWAY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_GATEWAY_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
