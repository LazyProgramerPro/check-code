import {UpdateApiResourceAction, UpdateApiResourceParam} from "../models";
import {UPDATE_API_RESOURCE, UPDATE_API_RESOURCE_ERROR, UPDATE_API_RESOURCE_SUCCESS} from "../constants";

export const updateApiResource = (params: UpdateApiResourceParam) : UpdateApiResourceAction =>{
  return {
    type: UPDATE_API_RESOURCE,
    params: params,
  }
}

export const updateApiResourceSuccess = (resp: any): UpdateApiResourceAction => {
  return {
    type: UPDATE_API_RESOURCE_SUCCESS,
  }
}

export const updateApiResourceError = (error: UpdateApiResourceAction['error']): UpdateApiResourceAction => {
  return{
    type: UPDATE_API_RESOURCE_ERROR,
    error: error
  }
}
