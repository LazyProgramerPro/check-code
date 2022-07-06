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
  AuthConfigurationEntity,
  CheckApiEndpointConfigurationAction,
  CheckApiEndpointConfigurationData,
  CheckApiEndpointConfigurationParam,
  CheckLoadBalancerConfigurationEntity,
} from '../models';

export const initData = (data: CheckApiEndpointConfigurationData): CheckApiEndpointConfigurationAction => {
  return {
    type: INIT_DATA,
    data: data,
  };
};

export const setProductionEndpoint = (endpointActive: boolean): CheckApiEndpointConfigurationAction => {
  return {
    type: SET_PRODUCTION,
    endpointActive: endpointActive,
  };
};

export const setSandboxEndpoint = (endpointActive: boolean): CheckApiEndpointConfigurationAction => {
  return {
    type: SET_SANDBOX,
    endpointActive: endpointActive,
  };
};

export const changeType = (type: string): CheckApiEndpointConfigurationAction => {
  return {
    type: CHANGE_ENDPOINT_TYPE,
    endpointType: type,
  };
};

export const changeProduction = (endpointUrl: string): CheckApiEndpointConfigurationAction => {
  return {
    type: CHANGE_PRODUCTION,
    endpointUrl: endpointUrl,
  };
};

export const changeSandbox = (endpointUrl: string): CheckApiEndpointConfigurationAction => {
  return {
    type: CHANGE_SANDBOX,
    endpointUrl: endpointUrl,
  };
};

export const checkProductionSecurity = (
  securityConfig: AuthConfigurationEntity,
): CheckApiEndpointConfigurationAction => {
  return {
    type: CHECK_PRODUCTION_SECURITY,
    securityConfig: securityConfig,
  };
};

export const checkSandboxSecurity = (securityConfig: AuthConfigurationEntity): CheckApiEndpointConfigurationAction => {
  return {
    type: CHECK_SANDBOX_SECURITY,
    securityConfig: securityConfig,
  };
};

export const checkLoadBalancerConfiguration = (
  loadBalancerConfig: CheckLoadBalancerConfigurationEntity,
): CheckApiEndpointConfigurationAction => {
  return {
    type: CHECK_LOAD_BALANCER_CONFIGURATION,
    loadBalancerConfig: loadBalancerConfig,
  };
};

export const checkApiEndpointConfiguration = (
  params: CheckApiEndpointConfigurationParam,
): CheckApiEndpointConfigurationAction => {
  return {
    type: CHECK_API_ENDPOINT_CONFIGURATION,
    params: params,
  };
};

export const checkApiEndpointConfigurationSuccess = (resp: any): CheckApiEndpointConfigurationAction => {
  return {
    type: CHECK_API_ENDPOINT_CONFIGURATION_SUCCESS,
  };
};

export const checkApiEndpointConfigurationError = (
  error: CheckApiEndpointConfigurationAction['error'],
): CheckApiEndpointConfigurationAction => {
  return {
    type: CHECK_API_ENDPOINT_CONFIGURATION_ERROR,
    error: error,
  };
};
