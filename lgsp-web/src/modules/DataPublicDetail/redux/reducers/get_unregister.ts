import { SUB_UNREGISTER, SUB_UNREGISTER_ERROR, SUB_UNREGISTER_SUCCESS } from '../constanst';
import { GetUnRegisterAction, GetUnRegisterState } from '../models';

const initState: GetUnRegisterState = {
  loading: false,
  canChange: true,
  param: {
    apiId: '',
  },
  message: '',
  error: undefined,
};

export const getSetStatusState = (state = initState, { type, param, error }: GetUnRegisterAction) => {
  switch (type) {
    case SUB_UNREGISTER: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case SUB_UNREGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SUB_UNREGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
