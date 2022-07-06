import { GET_RESOURCE_ERROR } from 'src/modules/ConnectResource/redux/constanst';
import { LOAD_PAGE } from 'src/modules/User/redux/constant';
import { GET_GATEWAY, GET_GATEWAY_SUCCESS, RELOAD_DATA_GATEWAY } from '../constanst';
import { GetDataGatewayAction, GetDataGatewayParams } from '../models';

export const getDataGateway = (params: GetDataGatewayParams): GetDataGatewayAction => {
  return {
    type: GET_GATEWAY,
    params: params,
  };
};

export const getDataGatewaySuccess = (resp: any): GetDataGatewayAction => {
  return {
    type: GET_GATEWAY_SUCCESS,
    payload: resp,
  };
};

export const getDataGatewayErrors = (error: GetDataGatewayAction['error']): GetDataGatewayAction => {
  return {
    type: GET_RESOURCE_ERROR,
    error: error,
  };
};

export const reloadData = (): GetDataGatewayAction => {
  return {
    type: RELOAD_DATA_GATEWAY,
  };
};

export const loadPage = () => {
  return {
    type: LOAD_PAGE,
  };
};
