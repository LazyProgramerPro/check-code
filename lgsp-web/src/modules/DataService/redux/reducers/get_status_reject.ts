import {
  LOGIC_REJECT,
  REQUEST_REJECT,
  REQUEST_REJECT_ERROR,
  REQUEST_REJECT_SUCCESS,
  SHOW_REQUEST_REJECT_FORM,
} from '../constants';
import { RejectAction, RejectState } from '../models';

const initState: RejectState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    reason: '',
    requestId: '',
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, { type, show, params, error, originId }: RejectAction): RejectState => {
  switch (type) {
    case SHOW_REQUEST_REJECT_FORM:
      return {
        ...state,
        show: show,
        originId: originId,
      };

    case REQUEST_REJECT:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case LOGIC_REJECT:
      return {
        ...state,
        originId: originId,
      };

    case REQUEST_REJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case REQUEST_REJECT_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
