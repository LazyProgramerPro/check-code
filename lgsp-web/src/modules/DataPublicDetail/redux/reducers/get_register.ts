import { SUB_REGISTER, SUB_REGISTER_ERROR, SUB_REGISTER_SUCCESS } from '../constanst';
import { GetRegisterAction, GetRegisterState } from '../models';

const initState: GetRegisterState = {
  loading: false,
  canChange: true,
  param: {
    apiId: '',
  },
  message: '',
  error: undefined,
};

export const getStatusState = (state = initState, { type, param, error }: GetRegisterAction) => {
  switch (type) {
    case SUB_REGISTER: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case SUB_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SUB_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
