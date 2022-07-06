import { GET_DOCUMENT, GET_DOCUMENT_ERROR, GET_DOCUMENT_SUCCESS, RELOAD_DATA_DOCUMENT } from '../constanst';
import { GetDocumentState, GetDocumentAction, Document } from '../models';

// const initDocument: Document = {
//   documentId: '',
//   name: '',
//   type: '',
//   summary: '',
//   sourceType: '',
//   fileName: '',
//   inlineContent: '',
//   otherTypeName: '',
//   visibility: '',
//   createdTime: '',
//   createdBy: '',
//   lastUpdatedTime: '',
//   lastUpdateBy: '',
// };

const initState: GetDocumentState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getDocumentState = (
  state = initState,
  { type, payload, error, params }: GetDocumentAction,
): GetDocumentState => {
  switch (type) {
    case GET_DOCUMENT: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_DOCUMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows: payload?.rows,
        total: payload?.total,
      };
    }

    case GET_DOCUMENT_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_DOCUMENT: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
