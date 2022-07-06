import {
  EndpointEntity,
  GetApiEndpointConfigurationState,
  UpdateApiEndpointConfigurationAction,
  UpdateApiEndpointConfigurationParam,
  UpdateApiEndpointConfigurationState,
} from '../models';
import {
  CHANGE_API_ENDPOINT_TYPE,
  CHANGE_PRODUCTION_ENDPOINT,
  CHANGE_PRODUCTION_SECURITY,
  CHANGE_SANDBOX_ENDPOINT,
  CHANGE_SANDBOX_SECURITY, CLICK_UPDATE_ENDPOINT_CONFIGURATION,
  INIT_DEFAULT_DATA,
  SET_PRODUCTION_ACTIVE,
  SET_SANDBOX_ACTIVE,
  UPDATE_API_ENDPOINT_CONFIGURATION,
  UPDATE_API_ENDPOINT_CONFIGURATION_ERROR,
  UPDATE_API_ENDPOINT_CONFIGURATION_SUCCESS,
  UPDATE_LOAD_BALANCER_CONFIGURATION,
} from '../constants';

const initState: UpdateApiEndpointConfigurationState = {
  loading: false,
  error: undefined,
  checkClick: false,
  params: {
    apiId: '',
    endpointType: '',
    productionEndpoints: [],
    sandboxEndpoints: [],
    productionSecurity: {
      grantType: '',
      clientSecret: '',
      clientId: '',
      tokenUrl: '',
      username: '',
      password: '',
    },
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
  }: UpdateApiEndpointConfigurationAction,
): UpdateApiEndpointConfigurationState => {
  switch (type) {
    case INIT_DEFAULT_DATA: {
      return {
        ...state,
        data: data,
      };
    }

    case CHANGE_API_ENDPOINT_TYPE: {
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

    case CHANGE_PRODUCTION_ENDPOINT:
      const productionEndpointList: EndpointEntity[] = [{ url: endpointUrl || '' }];
      return {
        ...state,
        data: {
          ...state.data,
          productionEndpoints: productionEndpointList,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
        },
      };

    case SET_PRODUCTION_ACTIVE:
      return {
        ...state,
        data: {
          ...state.data,
          productionActive: endpointActive,
          productionEndpoints: state.data?.productionEndpoints || [],
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
        },
      };

    case SET_SANDBOX_ACTIVE:
      return {
        ...state,
        data: {
          ...state.data,
          sandboxActive: endpointActive,
          productionEndpoints: state.data?.productionEndpoints || [],
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
        },
      };

    case CHANGE_SANDBOX_ENDPOINT:
      const sandboxEndpointList: EndpointEntity[] = [{ url: endpointUrl || '' }];
      return {
        ...state,
        data: {
          ...state.data,
          sandboxEndpoints: sandboxEndpointList,
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case CHANGE_PRODUCTION_SECURITY:
      return {
        ...state,
        data: {
          ...state.data,
          productionSecurity: securityConfig,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case CHANGE_SANDBOX_SECURITY:
      return {
        ...state,
        data: {
          ...state.data,
          sandboxSecurity: securityConfig,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case UPDATE_LOAD_BALANCER_CONFIGURATION:
      return {
        ...state,
        data: {
          ...state.data,
          loadBalancerConfiguration: loadBalancerConfig,
          sandboxEndpoints: state.data?.sandboxEndpoints || [],
          productionEndpoints: state.data?.productionEndpoints || [],
        },
      };

    case UPDATE_API_ENDPOINT_CONFIGURATION:
      return {
        ...state,
        params: params,
        loading: true,
      };

    case UPDATE_API_ENDPOINT_CONFIGURATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_API_ENDPOINT_CONFIGURATION_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    case CLICK_UPDATE_ENDPOINT_CONFIGURATION:
      return {
        ...state,
        checkClick: !state.checkClick
      }

    default:
      return state;
  }
};
