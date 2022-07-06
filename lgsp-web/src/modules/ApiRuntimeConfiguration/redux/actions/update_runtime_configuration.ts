import {UpdateApiRuntimeConfigurationAction, UpdateApiRuntimeConfigurationParam} from "../models";
import {
  UPDATE_API_RUNTIME_CONFIGURATION, UPDATE_API_RUNTIME_CONFIGURATION_ERROR, UPDATE_API_RUNTIME_CONFIGURATION_SUCCESS
} from "../constants"

export const updateApiRuntimeConfiguration = (params: UpdateApiRuntimeConfigurationParam) : UpdateApiRuntimeConfigurationAction =>{
  return {
    type: UPDATE_API_RUNTIME_CONFIGURATION,
    params: params,
  }
}

export const updateApiRuntimeConfigurationSuccess = (): UpdateApiRuntimeConfigurationAction => {
  return {
    type: UPDATE_API_RUNTIME_CONFIGURATION_SUCCESS,
  }
}

export const updateApiRuntimeConfigurationError = (error: UpdateApiRuntimeConfigurationAction['error']): UpdateApiRuntimeConfigurationAction => {
  return{
    type: UPDATE_API_RUNTIME_CONFIGURATION_ERROR,
    error: error
  }
}
