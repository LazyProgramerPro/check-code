import {GET, POST} from '../../../services';
import {ListResponseBase} from "../../../models/baseResponse";
import { IGroupApiEndpointObject } from '../models';

export const getGroupApiEndpointService = async (apiId: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-api-endpoint/${apiId}`)) as ListResponseBase<any>;
    return response;
  } catch(error) {
    return error;
  }
};

export const updateGroupApiEndpointService = async (params: Partial<IGroupApiEndpointObject>): Promise<any> => {
  try {
    return POST('core-svc/publisher-api-endpoint/update', params);
  } catch(error) {
    return error;
  }
}
