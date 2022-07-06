import { AppError } from '../../../../models/baseResponse';
import { SHOW_UPDATE_GATEWAY_FORM, UPDATE_GATEWAY, UPDATE_GATEWAY_ERROR, UPDATE_GATEWAY_SUCCESS } from '../constanst';
import { CreateGatewayAction, DataGateway, UpdateGatewayAction, UpdateGatewayParam } from '../models';
export const showUpdateGatewayForm = (show: boolean, data?: DataGateway): UpdateGatewayAction => {
  if (data === undefined) {
    return {
      type: SHOW_UPDATE_GATEWAY_FORM,
      show: show,
    };
  }
  return {
    type: SHOW_UPDATE_GATEWAY_FORM,
    show: show,
    originData: data,
  };
};

export const updateGateway = (params: UpdateGatewayParam): UpdateGatewayAction => {
  return {
    type: UPDATE_GATEWAY,
    params: params,
  };
};

export const updateGatewaySuccess = (): CreateGatewayAction => {
  return {
    type: UPDATE_GATEWAY_SUCCESS,
  };
};

export const updateGatewayError = (error: AppError): UpdateGatewayAction => {
  return {
    type: UPDATE_GATEWAY_ERROR,
    error: error,
  };
};
