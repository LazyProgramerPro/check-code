import { CREATE_GATEWAY, CREATE_GATEWAY_ERROR, CREATE_GATEWAY_SUCCESS, SHOW_CREATE } from "../constanst";
import { CreateGatewayAction, CreateGatewayParams } from "../models";
export const showCreateGatewayForm = (show: boolean): CreateGatewayAction => {
  return {
    type: SHOW_CREATE,
    show: show,
  };
};

export const createGateway = (params: CreateGatewayParams): CreateGatewayAction => {
  return {
    type: CREATE_GATEWAY,
    params: params,
  };
};

export const createGatewaySuccess = () => {
  return {
    type: CREATE_GATEWAY_SUCCESS,
  };
};

export const createGatewayError = (error: CreateGatewayAction['error']): CreateGatewayAction => {
  return {
    type: CREATE_GATEWAY_ERROR,
    error: error,
  };
};
