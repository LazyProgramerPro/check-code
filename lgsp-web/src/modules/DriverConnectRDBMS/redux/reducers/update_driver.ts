import { SHOW_UPDATE_DRIVER_FORM, UPDATE_DRIVER, UPDATE_DRIVER_ERROR, UPDATE_DRIVER_SUCCESS } from '../constanst';
import { UpdateDriverAction, UpDateDriverState } from '../models';

const initState: UpDateDriverState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    id: '',
    file: undefined,
    version: '',
    type: 0,
    name: '',
  },
  originData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  { type, show, originData, params, error }: UpdateDriverAction,
): UpDateDriverState => {
  switch (type) {
    case SHOW_UPDATE_DRIVER_FORM:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case UPDATE_DRIVER:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case UPDATE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_DRIVER_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
