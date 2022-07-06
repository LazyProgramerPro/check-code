import { GET_DOCUMENT, GET_DOCUMENT_ERROR, GET_DOCUMENT_SUCCESS, RELOAD_DATA_DOCUMENT } from '../constanst';
import { GetDocumentAction, GetDocumentParams } from '../models';

export const getDocument = (params: GetDocumentParams): GetDocumentAction => {
  return {
    type: GET_DOCUMENT,
    params: params,
  };
};

export const getDocumentSuccess = (resp: any): GetDocumentAction => {
  return {
    type: GET_DOCUMENT_SUCCESS,
    payload: resp,
  };
};

export const getDocumentErrors = (error: GetDocumentAction['error']): GetDocumentAction => {
  return {
    type: GET_DOCUMENT_ERROR,
    error: error,
  };
};

export const reloadData = (): GetDocumentAction => {
  return {
    type: RELOAD_DATA_DOCUMENT,
  };
};
