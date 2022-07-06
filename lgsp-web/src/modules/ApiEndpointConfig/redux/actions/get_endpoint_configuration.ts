import {
  GET_API_ENDPOINT_CONFIGURATION,
  GET_API_ENDPOINT_CONFIGURATION_ERROR,
  GET_API_ENDPOINT_CONFIGURATION_SUCCESS,
  RELOAD_API_ENDPOINT_CONFIGURATION,
} from '../constants';
import { GetApiEndpointConfigurationAction } from '../models';

export const getApiEndpointConfiguration = (apiId: string): GetApiEndpointConfigurationAction => {
  return {
    type: GET_API_ENDPOINT_CONFIGURATION,
    apiId: apiId,
  };
};

export const getApiEndpointConfigurationSuccess = (resp: any): GetApiEndpointConfigurationAction => {
  return {
    type: GET_API_ENDPOINT_CONFIGURATION_SUCCESS,
    payload: resp,
  };
};

export const getApiEndpointConfigurationError = (
  error: GetApiEndpointConfigurationAction['error'],
): GetApiEndpointConfigurationAction => {
  return {
    type: GET_API_ENDPOINT_CONFIGURATION_ERROR,
    error: error,
  };
};

export const reloadData = () => {
  return {
    type: RELOAD_API_ENDPOINT_CONFIGURATION,
  };
};
