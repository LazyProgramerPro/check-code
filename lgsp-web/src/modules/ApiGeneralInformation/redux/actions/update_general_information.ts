import {
  UPDATE_API_GENERAL_INFORMATION,
  UPDATE_API_GENERAL_INFORMATION_ERROR,
  UPDATE_API_GENERAL_INFORMATION_SUCCESS
} from "../constants";
import {UpdateApiGeneralInformationAction, UpdateApiGeneralInformationParam} from "../models";
;

export const updateApiGeneralInformation = (params: UpdateApiGeneralInformationParam) : UpdateApiGeneralInformationAction =>{
  return {
    type: UPDATE_API_GENERAL_INFORMATION,
    params: params,
  }
}

export const updateApiGeneralInformationSuccess = (resp: any): UpdateApiGeneralInformationAction => {
  return {
    type: UPDATE_API_GENERAL_INFORMATION_SUCCESS,
  }
}

export const updateApiGeneralInformationError = (error: UpdateApiGeneralInformationAction['error']): UpdateApiGeneralInformationAction => {
  return{
    type: UPDATE_API_GENERAL_INFORMATION_ERROR,
    error: error
  }
}
