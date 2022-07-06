import { DeleteGatewayAction, DeleteGatewayParam } from '../models';
import { DELETE_GATEWAY, DELETE_GATEWAY_ERROR, DELETE_GATEWAY_SUCCESS, RELOAD_DATA } from '../constanst';
export const deleteGateway = (param?: DeleteGatewayParam) => {
  return {
    type: DELETE_GATEWAY,
    param: param,
  };
};

export const deleteGatewaySuccess = () => {
  return {
    type: DELETE_GATEWAY_SUCCESS,
  };
};

export const deleteGatewayError = (error: DeleteGatewayAction['error']) => {
  return {
    type: DELETE_GATEWAY_ERROR,
    error: error,
  };
};

export const reloadData = (): DeleteGatewayAction => {
  return {
    type: RELOAD_DATA,
  };
};
