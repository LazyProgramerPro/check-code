import {ApiDocumentEntity, CreateApiDocumentAction, UpdateApiDocumentAction, UpdateApiDocumentParam} from "../models";

import {AppError} from "../../../../models/baseResponse";
import {
  SHOW_UPDATE_API_DOCUMENT_FORM,
  UPDATE_API_DOCUMENT,
  UPDATE_API_DOCUMENT_ERROR,
  UPDATE_API_DOCUMENT_SUCCESS
} from "../constants";

export const showUpdateApiDocumentForm = (show: boolean, data?: ApiDocumentEntity): UpdateApiDocumentAction  => {
  if(data === undefined){
    return {
      type: SHOW_UPDATE_API_DOCUMENT_FORM,
      show: show
    }
  }
  return {
    type: SHOW_UPDATE_API_DOCUMENT_FORM,
    show: show,
    originData: data
  }
}

export const updateApiDocument = (params: UpdateApiDocumentParam): UpdateApiDocumentAction => {
  return{
    type: UPDATE_API_DOCUMENT,
    params: params,
  }
}

export const updateApiDocumentSuccess = (): CreateApiDocumentAction => {
  return{
    type: UPDATE_API_DOCUMENT_SUCCESS
  }
}

export const updateApiDocumentError = (error: AppError): UpdateApiDocumentAction => {
  return{
    type: UPDATE_API_DOCUMENT_ERROR,
    error: error
  }
}
