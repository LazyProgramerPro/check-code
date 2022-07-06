import { GET, POST } from '../../../../services';
import { ListResponseBase } from '../../../../models/baseResponse';
import { DeployGatewayParam } from '../models';

export const getGatewayListService = async (apiId: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-apis/${apiId}/gateway`)) as ListResponseBase<any>;
    return response;
  } catch (error) {
    return error;
  }
};

export const deployApiViaGateway = (params: DeployGatewayParam): Promise<any> => {
  return POST('core-svc/publisher-apis/deploy', params);
};

export const deployApiNewVersionViaGateway = (params: DeployGatewayParam): Promise<any> => {
  return POST('core-svc/publisher-apis/deploy-new-version', params);
};

export const checkStatus = (id: string): Promise<any> => {
  return GET(`core-svc/publisher-api-endpoint/${id}/status`);
};
