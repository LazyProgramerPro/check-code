import {
  CHANGE_ENDPOINT_TYPE,
  CHANGE_PRODUCTION,
  CHANGE_SANDBOX,
  CHECK_API_ENDPOINT_CONFIGURATION,
  CHECK_API_ENDPOINT_CONFIGURATION_ERROR,
  CHECK_API_ENDPOINT_CONFIGURATION_SUCCESS,
  CHECK_LOAD_BALANCER_CONFIGURATION,
  CHECK_PRODUCTION_SECURITY,
  CHECK_SANDBOX_SECURITY,
  INIT_DATA,
  SET_PRODUCTION,
  SET_SANDBOX,
} from '../constants';
import {
  CheckApiEndpointConfigurationAction,
  CheckApiEndpointConfigurationState,
  CheckEndpointEntity,
} from '../models';

const initState: CheckApiEndpointConfigurationState = {
  loading: false,
  error: undefined,
  params: {
    apiId: '',
    endpointType: '',
    productionEndpoints: [],
    sandboxEndpoints: [],
    productionActive: true,
    productionSecurity: {
      grantType: '',
      clientSecret: '',
      clientId: '',
      tokenUrl: '',
      username: '',
      password: '',
    },
    sandboxActive: true,
    sandboxSecurity: {
      grantType: '',
      clientSecret: '',
      clientId: '',
      tokenUrl: '',
      username: '',
      password: '',
    },
    loadBalancerConfiguration: {
      algorithm: '',
      sessionManagement: '',
      sessionTimeout: 0,
    },
  },
};

export default (
  state = initState,
  {
    type,
    endpointType,
    endpointUrl,
    securityConfig,
    loadBalancerConfig,
    endpointActive,
    data,
    params,
    error,
  }: CheckApiEndpointConfigurationAction,
): CheckApiEndpointConfigurationState => {
  switch (type) {
    case INIT_DATA: {
      return {
        ...state,
        data: data,
      };
    }

    case CHANGE_ENDPOINT_TYPE: {
      return {
        ...state,
        data: {
          ...state.data,
          endpointType: endpointType || '',
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };
    }

    case CHANGE_PRODUCTION:
      const productionEndpointList: CheckEndpointEntity[] = [{ templateNotSupported: true, url: endpointUrl || '' }];
      return {
        ...state,
        data: {
          ...state.data,
          productionEndpoints: productionEndpointList,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
        },
      };

    case SET_PRODUCTION:
      return {
        ...state,
        data: {
          ...state.data,
          productionActive: endpointActive,
          productionEndpoints: state.data?.productionEndpoints || [],
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
        },
      };

    case SET_SANDBOX:
      return {
        ...state,
        data: {
          ...state.data,
          sandboxActive: endpointActive,
          productionEndpoints: state.data?.productionEndpoints || [],
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
        },
      };

    case CHANGE_SANDBOX:
      const sandboxEndpoint: CheckEndpointEntity[] = [{ templateNotSupported: true, url: endpointUrl || '' }];
      return {
        ...state,
        data: {
          ...state.data,
          sandboxEndpoints: sandboxEndpoint,
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case CHECK_PRODUCTION_SECURITY:
      return {
        ...state,
        data: {
          ...state.data,
          productionSecurity: securityConfig,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case CHECK_SANDBOX_SECURITY:
      return {
        ...state,
        data: {
          ...state.data,
          sandboxSecurity: securityConfig,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case CHECK_LOAD_BALANCER_CONFIGURATION:
      return {
        ...state,
        data: {
          ...state.data,
          loadBalancerConfiguration: loadBalancerConfig,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case CHECK_API_ENDPOINT_CONFIGURATION:
      return {
        ...state,
        params: params,
        loading: true,
      };

    case CHECK_API_ENDPOINT_CONFIGURATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CHECK_API_ENDPOINT_CONFIGURATION_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
