import {
  CHANGE_API_ENDPOINT_TYPE,
  CHANGE_PRODUCTION_ENDPOINT,
  CHANGE_PRODUCTION_SECURITY, CHANGE_SANDBOX_ENDPOINT,
  CHANGE_SANDBOX_SECURITY, CLICK_UPDATE_ENDPOINT_CONFIGURATION,
  INIT_DEFAULT_DATA, SET_PRODUCTION_ACTIVE, SET_SANDBOX_ACTIVE,
  UPDATE_API_ENDPOINT_CONFIGURATION,
  UPDATE_API_ENDPOINT_CONFIGURATION_ERROR,
  UPDATE_API_ENDPOINT_CONFIGURATION_SUCCESS,
  UPDATE_LOAD_BALANCER_CONFIGURATION
} from "../constants";
import {
  ApiEndpointConfigurationData,
  LoadBalancerConfigurationEntity,
  OAuthConfigurationEntity,
  UpdateApiEndpointConfigurationAction,
  UpdateApiEndpointConfigurationParam
} from "../models";

export const initDefaultData = (data: ApiEndpointConfigurationData): UpdateApiEndpointConfigurationAction => {
  return {
    type: INIT_DEFAULT_DATA,
    data: data
  }
}

export const setProductionEndpointActive = (endpointActive: boolean): UpdateApiEndpointConfigurationAction => {
  return {
    type: SET_PRODUCTION_ACTIVE,
    endpointActive: endpointActive
  }
}

export const setSandboxEndpointActive = (endpointActive: boolean): UpdateApiEndpointConfigurationAction => {
  return {
    type: SET_SANDBOX_ACTIVE,
    endpointActive: endpointActive
  }
}


export const changeEndpointType = (type: string): UpdateApiEndpointConfigurationAction => {
  return {
    type: CHANGE_API_ENDPOINT_TYPE,
    endpointType: type,
  }
}

export const changeProductionEndpoint = (endpointUrl: string): UpdateApiEndpointConfigurationAction => {
  return {
    type: CHANGE_PRODUCTION_ENDPOINT,
    endpointUrl: endpointUrl
  }
}

export const changeSandboxEndpoint = (endpointUrl: string): UpdateApiEndpointConfigurationAction => {
  return {
    type: CHANGE_SANDBOX_ENDPOINT,
    endpointUrl: endpointUrl
  }
}

export const changeProductionSecurity = (securityConfig: OAuthConfigurationEntity): UpdateApiEndpointConfigurationAction => {
  return {
    type: CHANGE_PRODUCTION_SECURITY,
    securityConfig: securityConfig
  }
}

export const changeSandboxSecurity = (securityConfig: OAuthConfigurationEntity): UpdateApiEndpointConfigurationAction => {
  return {
    type: CHANGE_SANDBOX_SECURITY,
    securityConfig: securityConfig
  }
}

export const updateLoadBalancerConfiguration = (loadBalancerConfig: LoadBalancerConfigurationEntity) : UpdateApiEndpointConfigurationAction => {
  return {
    type: UPDATE_LOAD_BALANCER_CONFIGURATION,
    loadBalancerConfig: loadBalancerConfig
  }
}

export const updateApiEndpointConfiguration = (params: UpdateApiEndpointConfigurationParam) : UpdateApiEndpointConfigurationAction =>{
  return {
    type: UPDATE_API_ENDPOINT_CONFIGURATION,
    params: params
  }
}

export const updateApiEndpointConfigurationSuccess = (resp: any): UpdateApiEndpointConfigurationAction => {
  return {
    type: UPDATE_API_ENDPOINT_CONFIGURATION_SUCCESS,
  }
}

export const updateApiEndpointConfigurationError = (error: UpdateApiEndpointConfigurationAction['error']): UpdateApiEndpointConfigurationAction => {
  return{
    type: UPDATE_API_ENDPOINT_CONFIGURATION_ERROR,
    error: error
  }
}

export const checkClickUpdateConfiguration = (): UpdateApiEndpointConfigurationAction => {
  return {
    type: CLICK_UPDATE_ENDPOINT_CONFIGURATION
  }
}

