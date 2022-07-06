
import {GetApiDocumentAction, GetApiDocumentState} from "../models";
import {
  GET_API_DOCUMENT,
  GET_API_DOCUMENT_ERROR,
  GET_API_DOCUMENT_SUCCESS,
  RELOAD_API_DOCUMENT_DATA
} from "../constants";

const initState: GetApiDocumentState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
  lastUpdate: ''
};

export default (state = initState, { type, payload, error, params }: GetApiDocumentAction): GetApiDocumentState => {
  switch (type) {
    case GET_API_DOCUMENT: {
      return {
        ...state,
        loading: true,
        params: params,
      };
    }

    case GET_API_DOCUMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows: payload?.rows || [],
        total: payload?.total || 0,
      };
    }

    case GET_API_DOCUMENT_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_API_DOCUMENT_DATA: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
