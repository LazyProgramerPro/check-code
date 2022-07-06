import { PUBLIC_INFOR, PUBLIC_INFOR_ERROR, PUBLIC_INFOR_SUCCESS } from '../constants';
import { PublicInforAction, PublicInforState } from '../models';

const initState: PublicInforState = {
  loading: false,
  canChange: true,
  param: {
    id: '',
    content: '',
  },
  message: '',
  error: undefined,
};

export const publicState = (state = initState, { type, param, error }: PublicInforAction) => {
  switch (type) {
    case PUBLIC_INFOR: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case PUBLIC_INFOR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case PUBLIC_INFOR_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
