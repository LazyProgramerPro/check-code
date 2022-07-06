import {GET, POST} from "../../../../services";
import {ListResponseBase} from "../../../../models/baseResponse";
import {CheckApiEndpointConfigurationParam, UpdateApiEndpointConfigurationParam} from "../models";

export const getApiEndpointConfigurationService = async (apiId?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-api-endpoint/${apiId}`)) as ListResponseBase<any>;
    return response;
  } catch(error) {
    return error;
  }
};

export const updateApiEndpointConfigurationService = async (params?: UpdateApiEndpointConfigurationParam): Promise<any> => {
  try {
    return POST('core-svc/publisher-api-endpoint/update', params);
  } catch(error) {
    return error;
  }
}

export const checkApiEndpointConfigurationService = async (params?: UpdateApiEndpointConfigurationParam): Promise<any> => {
  try {
    return POST('core-svc/publisher-api-endpoint/check-update', params);
  } catch(error) {
    return error;
  }
}
