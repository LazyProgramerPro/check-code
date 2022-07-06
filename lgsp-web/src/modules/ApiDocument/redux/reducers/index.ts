import getState from './get_api_document'
import {CreateApiDocumentState, DeleteApiDocumentState, GetApiDocumentState, UpdateApiDocumentState} from "../models";
import {combineReducers} from "redux";
import createState from './create_document'
import updateState from './update_document'
import deleteState from './delete_document'

export interface ApiDocumentModuleState{
  getState: GetApiDocumentState,
  createState: CreateApiDocumentState,
  updateState: UpdateApiDocumentState
  deleteState: DeleteApiDocumentState,
}

export default combineReducers<ApiDocumentModuleState> ({
  getState: getState,
  createState: createState,
  updateState: updateState,
  deleteState: deleteState
})
