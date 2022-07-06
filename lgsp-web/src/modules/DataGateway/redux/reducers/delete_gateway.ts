import { DELETE_GATEWAY, DELETE_GATEWAY_ERROR, DELETE_GATEWAY_SUCCESS } from '../constanst';
import { DeleteGatewayAction, DeleteGatewayState } from '../models';

const initState: DeleteGatewayState = {
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
export const deleteState = (state = initState, { type, param, error }: DeleteGatewayAction) => {
  switch (type) {
    case DELETE_GATEWAY: {
      return {
        ...state,
        loading: true,
        error: undefined,
        param: param,
      };
    }

    case DELETE_GATEWAY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_GATEWAY_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
