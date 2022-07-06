import {UpdateApiRuntimeConfigurationAction, UpdateApiRuntimeConfigurationState} from "../models";
import {
  UPDATE_API_RUNTIME_CONFIGURATION,
  UPDATE_API_RUNTIME_CONFIGURATION_ERROR,
  UPDATE_API_RUNTIME_CONFIGURATION_SUCCESS
} from "../constants";


const initState: UpdateApiRuntimeConfigurationState = {
  loading: false,
  error: undefined,
  params: undefined
}

export default (state = initState, {type, params, error}: UpdateApiRuntimeConfigurationAction): UpdateApiRuntimeConfigurationState => {
  switch (type) {

    case UPDATE_API_RUNTIME_CONFIGURATION:
      return {
        ...state,
        params: params,
        loading: true
      }

    case UPDATE_API_RUNTIME_CONFIGURATION_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case UPDATE_API_RUNTIME_CONFIGURATION_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
