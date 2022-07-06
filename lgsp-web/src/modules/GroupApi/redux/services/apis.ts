import { GET, POST, POSTIMAGE } from '../../../../services';
import { IRestApiObject } from '../models';
import { RestApiEntity } from '../../../RestApi/redux/models';
import { ListResponseBase } from '../../../../models/baseResponse';
import { DeleteServiceParam } from '../../../ServicePublic/redux/models';

export const searchGroupRestApi = async (params?: any): Promise<ListResponseBase<IRestApiObject>> => {
  try {
    const response = (await GET('core-svc/publisher-apis/search', params)) as ListResponseBase<IRestApiObject>;
    return {
      total: response.total,
      rows: response?.rows || [],
      code: response.code,
      message: response.message,
    };
  } catch (error) {
    return error as any;
  }
};

export const getGroupRestApiDetail = async (groupId?: any): Promise<ListResponseBase<RestApiEntity>> => {
  const response = (await GET(`core-svc/publisher-apis/find/${groupId}`)) as ListResponseBase<RestApiEntity>;
  return response;
};

export const createGroupRestAPI = async (params?: Partial<IRestApiObject>): Promise<any> => {
  try {
    return POST('core-svc/publisher-apis/create', params);
  } catch (error) {
    return error;
  }
};

export const createGroupApiNewVersion = async (params: Partial<IRestApiObject>): Promise<any> => {
  try {
    return POST('core-svc/publisher-apis/new-version', params);
  } catch (error) {
    return error;
  }
};

export const createGroupWsdlFileAPI = (params: FormData): Promise<any> => {
  return POSTIMAGE('core-svc/publisher-apis/import-wsdl', params, {});
};

export const deleteGroupAPI = (params: Partial<IRestApiObject>): Promise<any> => {
  return POST('core-svc/publisher-apis/delete', params);
};

export const checkingBeforeDeleteApiService = (params: DeleteServiceParam): Promise<any> => {
  return POST('core-svc/publisher-apis/delete-check', params);
};

export const deleteApiService = (params: DeleteServiceParam): Promise<any> => {
  return POST('core-svc/publisher-apis/delete', params);
};
//
// export const updateGroupRestAPI = (params?: CreateGroupRestAPIParams): Promise<any> => {
//   return POST('group-rest-api/account/update-account', params);
// }
//
// export const deleteGroupRestAPI = (param: DeleteGroupRestAPIParam | undefined): Promise<any> => {
//   return POST('group-rest-api/account/delete-account', param);
// }
//
// export const checkDeleteGroupRestAPI = (param: DeleteGroupRestAPIParam | undefined): Promise<any> => {
//   return POST('group-rest-api/account/check-delete-account', param);
// }

export const lastUpdateTime = (apiId: string): Promise<any> => {
  return GET(`core-svc/publisher-apis/${apiId}/last-update`);
};
export const validateApiName = (name: string): Promise<any> => {
  return GET(`core-svc/publisher-apis/validate-name?name=${name}`);
};

export const validateApiInfo = (context: string): Promise<any> => {
  return GET(`core-svc/publisher-apis/validate-context?context=${context}`);
};
