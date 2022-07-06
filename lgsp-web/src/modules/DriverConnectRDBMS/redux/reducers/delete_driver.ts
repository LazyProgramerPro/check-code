import { DELETE_DATA_DRIVER, DELETE_DRIVER_ERROR, DELETE_DRIVER_SUCCESS } from "../constanst";
import { DeleteDriverAction, DeleteDriverState } from "../models";

const initState: DeleteDriverState = {
  loading: false,
  show: false,
  canDelete: true,
  param: {
    id: '',
  },
  message: '',
  error: undefined,
};
// eslint-disable-next-line import/no-anonymous-default-export
export const deleteState = (state = initState, { type, param, error }: DeleteDriverAction) => {
  switch (type) {
    case DELETE_DATA_DRIVER: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_DRIVER_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
