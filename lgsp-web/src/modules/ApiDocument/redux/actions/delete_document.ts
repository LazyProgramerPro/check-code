import {AppError} from "../../../../models/baseResponse";
import {DeleteApiDocumentAction, DeleteApiDocumentParam} from "../models";
import {
  DELETE_API_DOCUMENT,
  DELETE_API_DOCUMENT_ERROR,
  DELETE_API_DOCUMENT_SUCCESS,
  SHOW_DELETE_API_DOCUMENT_CONFIRM
} from "../constants";

export const showDeleteApiDocumentConfirm = (show: boolean, param?: DeleteApiDocumentParam): DeleteApiDocumentAction  => {
  if(param === undefined){
    return {
      type: SHOW_DELETE_API_DOCUMENT_CONFIRM,
      show: show
    }
  }else {
    return {
      type: SHOW_DELETE_API_DOCUMENT_CONFIRM,
      show: show,
      param: param
    }
  }
}

export const deleteApiDocument = (param?: DeleteApiDocumentParam): DeleteApiDocumentAction => {
  return{
    type: DELETE_API_DOCUMENT,
    param: param
  }
}

export const deleteApiDocumentSuccess = (): DeleteApiDocumentAction => {
  return{
    type: DELETE_API_DOCUMENT_SUCCESS
  }
}

export const deleteApiDocumentError = (error: AppError): DeleteApiDocumentAction => {
  return{
    type: DELETE_API_DOCUMENT_ERROR,
    error: error
  }
}
