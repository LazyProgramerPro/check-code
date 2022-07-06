import { GET_APPROVE, GET_APPROVE_ERROR, GET_APPROVE_SUCCESS } from '../constants';
import { ApproveAction, ApproveState } from '../models';

const initState: ApproveState = {
  loading: false,
  canChange: true,
  param: {
    requestId: '',
  },
  message: '',
  error: undefined,
};

export const getStatusState = (state = initState, { type, param, error }: ApproveAction) => {
  switch (type) {
    case GET_APPROVE: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case GET_APPROVE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_APPROVE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
