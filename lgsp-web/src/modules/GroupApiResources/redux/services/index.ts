import {GET, POST} from '../../../../services';
import {ListResponseBase} from "../../../../models/baseResponse";
import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import { IGroupApiResourceObject } from '../models';

export const getGroupApiResourcesService = async (params: {apiId: string}): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-api-resource/list`,params)) as ListResponseBase<any>;
    console.log(JSON.stringify(response));
    return response;
  } catch(error) {
    return error;
  }
};

export const updateGroupApiResourcesService = async (params: Partial<IGroupApiResourceObject>): Promise<any> => {
  try {
    return POST('core-svc/publisher-api-resource/update', params);
  } catch(error) {
    return error;
  }
}
