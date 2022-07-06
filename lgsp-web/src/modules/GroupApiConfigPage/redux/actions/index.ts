import { GET_API_DEFINITION, GET_API_DEFINITION_ERROR, GET_API_DEFINITION_SUCCESS } from '../constants';
import { ApiDefinition, ApiDefinitionAction } from '../models';

export const getApiDefinition = (id: string): ApiDefinitionAction => {
  return {
    type: GET_API_DEFINITION,
    id: id,
  };
};

export const getApiDefinitionSuccess = (params: ApiDefinition): ApiDefinitionAction => {
  return {
    type: GET_API_DEFINITION_SUCCESS,
    params: params,
  };
};

export const getApiDefinitionError = (error: ApiDefinitionAction['error']): ApiDefinitionAction => {
  return {
    type: GET_API_DEFINITION_ERROR,
    error,
  };
};
