import { CreateDriverAction, CreateDriverState } from "../models";
import {CREATE_DRIVER, CREATE_DRIVER_ERROR, CREATE_DRIVER_SUCCESS, SHOW_CREATE_DRIVER} from '../constanst'
const initState: CreateDriverState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    file: undefined,
    name: '',
    type: 0,
    version: '',
  },
};

export const createState = (
  state = initState,
  { type, show, params, error }: CreateDriverAction,
): CreateDriverState => {
  switch (type) {
    case SHOW_CREATE_DRIVER:
      return {
        ...state,
        show: !!show,
      };

    case CREATE_DRIVER:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case CREATE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_DRIVER_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
