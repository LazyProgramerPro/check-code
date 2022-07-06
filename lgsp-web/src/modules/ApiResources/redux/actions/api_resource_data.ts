import {
  AddParameterToResourceParam,
  AddResourceParam,
  AddResponseToResourceParam,
  ApiResourceConfigData,
  ApiResourceDataAction,
  ChangeDescriptionResourceParam,
  ChangePolicyResourceParam,
  DeleteParameterFromResourceParam,
  DeleteResponseFromResourceParam,
  ResourceParam,
} from '../models';
import {
  ADD_NEW_API_RESOURCE,
  ADD_PARAMETER_TO_RESOURCE,
  ADD_RESPONSE_TO_RESOURCE,
  CHANGE_API_POLICY_TYPE,
  CHANGE_DESCRIPTION_RESOURCE,
  CHANGE_POLICY_RESOURCE,
  DELETE_API_RESOURCE,
  DELETE_PARAMETER_FROM_RESOURCE,
  DELETE_RESPONSE_FROM_RESOURCE,
  INIT_API_RESOURCE_DATA,
  RELOAD_API_RESOURCE,
  UPDATE_PARAMETER_TO_RESOURCE,
  UPDATE_RESPONSE_TO_RESOURCE,
} from '../constants';

export const initApiResourceData = (data: ApiResourceConfigData): ApiResourceDataAction => {
  return {
    type: INIT_API_RESOURCE_DATA,
    data: data,
  };
};

export const changePolicyType = (apiLevel: boolean, policyType?: string): ApiResourceDataAction => {
  if (policyType === undefined) {
    return {
      type: CHANGE_API_POLICY_TYPE,
      apiLevel: apiLevel,
    };
  } else {
    return {
      type: CHANGE_API_POLICY_TYPE,
      policyType: policyType,
      apiLevel: apiLevel,
    };
  }
};

export const addResource = (param: AddResourceParam): ApiResourceDataAction => {
  return {
    type: ADD_NEW_API_RESOURCE,
    addResourceParam: param,
  };
};

export const deleteResource = (param: ResourceParam): ApiResourceDataAction => {
  return {
    type: DELETE_API_RESOURCE,
    deleteResourceParam: param,
  };
};

export const addParameterToResource = (param: AddParameterToResourceParam): ApiResourceDataAction => {
  return {
    type: ADD_PARAMETER_TO_RESOURCE,
    addParameterToResource: param,
  };
};

export const updateParameterToResource = (param: AddParameterToResourceParam): ApiResourceDataAction => {
  return {
    type: UPDATE_PARAMETER_TO_RESOURCE,
    updateParameterToResource: param,
  };
};

export const updateResponseToResource = (param: AddResponseToResourceParam): ApiResourceDataAction => {
  return {
    type: UPDATE_RESPONSE_TO_RESOURCE,
    updateResponseToResource: param,
  };
};

export const deleteParameterFromResource = (param: DeleteParameterFromResourceParam): ApiResourceDataAction => {
  return {
    type: DELETE_PARAMETER_FROM_RESOURCE,
    deleteParameterFromResource: param,
  };
};

export const addResponseToResource = (param: AddResponseToResourceParam): ApiResourceDataAction => {
  return {
    type: ADD_RESPONSE_TO_RESOURCE,
    addResponseToResource: param,
  };
};

export const deleteResponseFromResource = (param: DeleteResponseFromResourceParam): ApiResourceDataAction => {
  return {
    type: DELETE_RESPONSE_FROM_RESOURCE,
    deleteResponseFromResource: param,
  };
};

export const changePolicyResource = (param: ChangePolicyResourceParam): ApiResourceDataAction => {
  return {
    type: CHANGE_POLICY_RESOURCE,
    changePolicyResource: param,
  };
};

export const changeDescriptionResource = (param: ChangeDescriptionResourceParam): ApiResourceDataAction => {
  return {
    type: CHANGE_DESCRIPTION_RESOURCE,
    changeDescriptionResource: param,
  };
};

export const loadPage = () => {
  return {
    type: RELOAD_API_RESOURCE,
  };
};
