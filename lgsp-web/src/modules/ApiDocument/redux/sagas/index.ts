import {all, takeLatest} from "redux-saga/effects";
import {CREATE_API_DOCUMENT, DELETE_API_DOCUMENT, GET_API_DOCUMENT, UPDATE_API_DOCUMENT} from "../constants";
import {getAllDocumentAsync} from "./get_api_document";
import {createApiDocumentAsync} from "./create_document";
import {updateApiDocumentAsync} from "./update_document";
import {deleteApiDocumentAsync} from "./delete_document";

export default function* root(){
  return all([
    yield  takeLatest(GET_API_DOCUMENT, getAllDocumentAsync),
    yield takeLatest(CREATE_API_DOCUMENT, createApiDocumentAsync),
    yield takeLatest(UPDATE_API_DOCUMENT, updateApiDocumentAsync),
    yield takeLatest(DELETE_API_DOCUMENT, deleteApiDocumentAsync)
  ]);
}
