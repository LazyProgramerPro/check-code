import {CreateApiDocumentState, DeleteApiDocumentAction, DeleteApiDocumentState} from "../models";
import {
  DELETE_API_DOCUMENT,
  DELETE_API_DOCUMENT_ERROR,
  DELETE_API_DOCUMENT_SUCCESS,
  SHOW_DELETE_API_DOCUMENT_CONFIRM
} from "../constants";

const initState: DeleteApiDocumentState ={
  loading: false,
  show: false,
  params: {
    id: ''
  },
  error: undefined
}

export default (state =initState, {type, show, param, error}: DeleteApiDocumentAction): DeleteApiDocumentState => {
  switch (type){

    case SHOW_DELETE_API_DOCUMENT_CONFIRM:
      if(param === undefined){
        return {
          ...state,
          show: show
        }
      }else {
        return {
          ...state,
          show: show,
          params: param
        }
      }

    case DELETE_API_DOCUMENT:
      if(param === undefined){
        return state;
      }else {
        return {
          ...state,
          loading: true,
          params: param
        };
      }


    case DELETE_API_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case DELETE_API_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
