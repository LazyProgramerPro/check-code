import {UpdateApiDocumentAction, UpdateApiDocumentState} from "../models";
import {
  SHOW_UPDATE_API_DOCUMENT_FORM,
  UPDATE_API_DOCUMENT,
  UPDATE_API_DOCUMENT_ERROR,
  UPDATE_API_DOCUMENT_SUCCESS
} from "../constants";

const initState: UpdateApiDocumentState ={
  loading: false,
  show: false,
  error: undefined,
  params: {
    apiId: '',
    docId: '',
    name: '',
    url: '',
    summary: '',
    docType: '',
    file: undefined,
  },
  originData: undefined
}

export default (state = initState, {type, show, originData, params, error}: UpdateApiDocumentAction): UpdateApiDocumentState => {
  switch (type) {
    case SHOW_UPDATE_API_DOCUMENT_FORM:
      return {
        ...state,
        show: show,
        originData: originData
      }

    case UPDATE_API_DOCUMENT:
      return {
        ...state,
        loading: true,
        params: params
      }

    case UPDATE_API_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case UPDATE_API_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
