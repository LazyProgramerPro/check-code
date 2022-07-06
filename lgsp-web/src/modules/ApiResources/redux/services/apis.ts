import {GET, POST} from "../../../../services";
import {ListResponseBase} from "../../../../models/baseResponse";
import {UpdateApiResourceParam} from "../models";
import {CommonSearchParam} from "../../../../models/common";


export const getApiResourcesService = async (apiId?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-api-resource/list?apiId=${apiId}`)) as ListResponseBase<any>;
    return response;
  } catch(error) {
    return error;
  }
};

export const updateApiResourcesService = async (params?: UpdateApiResourceParam): Promise<any> => {
  try {
    return POST('core-svc/publisher-api-resource/update', params);
  } catch(error) {
    return error;
  }
}

