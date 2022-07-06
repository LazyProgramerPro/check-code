import {put} from "redux-saga/effects";
import {GetApiDocumentAction} from "../models";
import {getAllApiDocumentsError, getAllApiDocumentsSuccess} from "../actions/get_api_document";
import {searchApiDocumentService} from "../services/apis";

export function* getAllDocumentAsync(action : GetApiDocumentAction){
  try {
    const users = yield searchApiDocumentService(action.params);
    yield put(getAllApiDocumentsSuccess(users));
  }catch (error){
    yield put(getAllApiDocumentsError(error));
  }
}
