import {DELETE_DATA_RESOURCE, DELETE_RESOURCE_ERROR, DELETE_RESOURCE_SUCCESS } from '../constanst';
import { DeleteResourceAction, DeleteResourceState } from '../models';

const initState: DeleteResourceState = {
  loading: false,
  show: false,
  canDelete: true,
  param: {
    uuid: '',
  },
  message: '',
  error: undefined,
};
// eslint-disable-next-line import/no-anonymous-default-export
export const deleteState = (state = initState, { type, param, error }: DeleteResourceAction) => {
  switch (type) {
    case DELETE_DATA_RESOURCE: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_RESOURCE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
