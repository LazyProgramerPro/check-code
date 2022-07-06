import {
  DETAIL_DOCUMENT,
  DETAIL_DOCUMENT_ERROR,
  DETAIL_DOCUMENT_SUCCESS,
  SHOW_DETAIL_DOCUMENT_FORM,
} from '../constanst';
import { DetailAction, DetailState } from '../models';

const initState: DetailState = {
  loading: false,
  error: undefined,
  params: {
    filename: '',
    summary: '',
    visibility: '',
    name: '',
  },
  originData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, { type, show, originData, params, error }: DetailAction): DetailState => {
  switch (type) {
    case SHOW_DETAIL_DOCUMENT_FORM:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case DETAIL_DOCUMENT:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case DETAIL_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DETAIL_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
