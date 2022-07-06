import { combineReducers } from 'redux';
import { GET_API_DEFINITION, GET_API_DEFINITION_ERROR, GET_API_DEFINITION_SUCCESS } from '../constants';
import { ApiDefinition, ApiDefinitionAction, ApiDefinitionState } from '../models';

const initApiDefinition: ApiDefinition = {
  data: {},
};

const initState: ApiDefinitionState = {
  loading: false,
  show: false,
  params: initApiDefinition,
  error: undefined,
};

const ApiDefinitionReducer = (
  state = initState,
  { type, params, error, id }: ApiDefinitionAction,
): ApiDefinitionState => {
  switch (type) {
    case GET_API_DEFINITION:
      return {
        ...state,
        loading: true,
      };

    case GET_API_DEFINITION_SUCCESS:
      return {
        ...state,
        loading: false,
        params: params,
      };

    case GET_API_DEFINITION_ERROR:
      return {
        ...state,
        error,
        loading: false,
        params: initApiDefinition,
      };
    default:
      return state;
  }
};

export interface ApiDefinitionModuleState {
  ApiDefinition: ApiDefinitionState;
}

export default combineReducers<ApiDefinitionModuleState>({
  ApiDefinition: ApiDefinitionReducer,
});
