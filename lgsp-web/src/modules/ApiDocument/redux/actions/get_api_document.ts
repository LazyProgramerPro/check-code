import {GetApiDocumentAction, GetApiDocumentParams} from "../models";
import {
  GET_API_DOCUMENT,
  GET_API_DOCUMENT_ERROR,
  GET_API_DOCUMENT_SUCCESS,
  RELOAD_API_DOCUMENT_DATA
} from "../constants";
import {AppError} from "../../../../models/baseResponse";


export const getAllApiDocuments = (params: GetApiDocumentParams): GetApiDocumentAction => {
  return {
    type: GET_API_DOCUMENT,
    params: params
  }
};

export const getAllApiDocumentsSuccess = (resp: any): GetApiDocumentAction => {
  return {
    type: GET_API_DOCUMENT_SUCCESS,
    payload: resp
  }
};

export const getAllApiDocumentsError = (error: AppError): GetApiDocumentAction => {
  return {
    type: GET_API_DOCUMENT_ERROR,
    error: error
  }
};

export const reloadData = () : GetApiDocumentAction => {
  return {
    type: RELOAD_API_DOCUMENT_DATA,
  }
}
