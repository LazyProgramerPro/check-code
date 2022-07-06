import {CreateApiDocumentAction, CreateApiDocumentState} from "../models";
import {
  CREATE_API_DOCUMENT,
  CREATE_API_DOCUMENT_ERROR,
  CREATE_API_DOCUMENT_SUCCESS,
  SHOW_CREATE_API_DOCUMENT_FORM
} from "../constants";

const initState: CreateApiDocumentState = {
  loading: false,
  show: false,
  params: {
    apiId: '',
    name: '',
    url: '',
    docType: '',
    summary: '',
    file: undefined,
  },
  error: undefined
}

export default (state = initState, {type, show, params, error}: CreateApiDocumentAction): CreateApiDocumentState => {
  switch (type) {
    case SHOW_CREATE_API_DOCUMENT_FORM :
      return {
        ...state,
        show: !!show
      }

    case CREATE_API_DOCUMENT:
      return {
        ...state,
        loading: true,
        params: params
      }

    case CREATE_API_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case CREATE_API_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
