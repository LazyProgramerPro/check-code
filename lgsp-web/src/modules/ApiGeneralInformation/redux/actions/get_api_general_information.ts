import {GetApiGeneralInformationAction} from "../models";
import {
  GET_API_GENERAL_INFORMATION,
  GET_API_GENERAL_INFORMATION_ERROR,
  GET_API_GENERAL_INFORMATION_SUCCESS,
  RELOAD_API_GENERAL_INFORMATION
} from "../constants";

export const getApiGeneralInformation = (apiId: string) : GetApiGeneralInformationAction =>{
  return {
    type: GET_API_GENERAL_INFORMATION,
    apiId: apiId
  }
}

export const getApiGeneralInformationSuccess = (resp: any): GetApiGeneralInformationAction => {
  return {
    type: GET_API_GENERAL_INFORMATION_SUCCESS,
    payload: resp
  }
}

export const getApiGeneralInformationError = (error: GetApiGeneralInformationAction['error']): GetApiGeneralInformationAction => {
  return{
    type: GET_API_GENERAL_INFORMATION_ERROR,
    error: error
  }
}

export const reloadData = (): GetApiGeneralInformationAction => {
  return {
    type: RELOAD_API_GENERAL_INFORMATION
  }
}
