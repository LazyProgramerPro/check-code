import { GetApiEndpointConfigurationAction, GetApiEndpointConfigurationState } from '../models';
import {
  GET_API_ENDPOINT_CONFIGURATION,
  GET_API_ENDPOINT_CONFIGURATION_ERROR,
  GET_API_ENDPOINT_CONFIGURATION_SUCCESS,
  RELOAD_API_ENDPOINT_CONFIGURATION,
} from '../constants';

const initState: GetApiEndpointConfigurationState = {
  loading: false,
  item: undefined,
  error: undefined,
  apiId: '',
  flag_reload: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  { type, apiId, payload, error }: GetApiEndpointConfigurationAction,
): GetApiEndpointConfigurationState => {
  switch (type) {
    case GET_API_ENDPOINT_CONFIGURATION:
      return {
        ...state,
        loading: true,
        apiId: apiId,
      };

    case GET_API_ENDPOINT_CONFIGURATION_SUCCESS:
      if (payload?.item !== undefined) {
        return {
          ...state,
          loading: false,
          item: payload?.item,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }

    case GET_API_ENDPOINT_CONFIGURATION_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    case RELOAD_API_ENDPOINT_CONFIGURATION:
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };

    default:
      return state;
  }
};
