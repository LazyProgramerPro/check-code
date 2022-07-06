import {
  CREATE_API_DOCUMENT,
  CREATE_API_DOCUMENT_ERROR,
  CREATE_API_DOCUMENT_SUCCESS,
  SHOW_CREATE_API_DOCUMENT_FORM
} from "../constants";
import {AppError} from "../../../../models/baseResponse";
import {CreateApiDocumentAction, CreateApiDocumentParam} from "../models";

export const showCreateApiDocumentForm = (show: boolean): CreateApiDocumentAction => {
  return {
    type: SHOW_CREATE_API_DOCUMENT_FORM,
    show: show
  }
}

export const createApiDocument = (params: CreateApiDocumentParam): CreateApiDocumentAction => {
  return {
    type: CREATE_API_DOCUMENT,
    params: params,
  }
}

export const createApiDocumentSuccess = (): CreateApiDocumentAction => {
  return {
    type: CREATE_API_DOCUMENT_SUCCESS
  }
}

export const createApiDocumentError = (error: AppError): CreateApiDocumentAction => {
  return {
    type: CREATE_API_DOCUMENT_ERROR,
    error: error
  }
}
