import { GET, POST } from '../../../../services';
import { ListResponseBase } from '../../../../models/baseResponse';
import { UpdateApiGeneralInformationParam } from '../models';
import { CommonSearchParam } from '../../../../models/common';

export const getApiGeneralInformationService = async (apiId?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-apis/find/${apiId}/information`)) as ListResponseBase<any>;
    return response;
  } catch (error) {
    return error;
  }
};

export const updateApiGeneralInformationService = async (params?: UpdateApiGeneralInformationParam): Promise<any> => {
  try {
    return POST('core-svc/publisher-apis/update-general-information', params);
  } catch (error) {
    return error;
  }
};

export const getCategories = async (params?: CommonSearchParam): Promise<any> => {
  try {
    const response = (await GET(`core-svc/category/all`)) as ListResponseBase<any>;
    return response;
  } catch (error) {
    return error;
  }
};

export const getPermissions = async (params?: CommonSearchParam): Promise<any> => {
  try {
    const response = (await GET(`core-svc/permission/list`)) as ListResponseBase<any>;
    return response;
  } catch (error) {
    return error;
  }
};
