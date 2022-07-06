import { ListResponseBase } from '../../../../models/baseResponse';
import { GET, POST } from '../../../../services';
import { ApproveParams, DataServiceEntity, RejectParams } from '../models';

export const searchDataService = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/publish-api-request/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const getDataServiceDetail = async (groupId?: any): Promise<ListResponseBase<DataServiceEntity>> => {
  const response = (await GET(`core-svc/data-service/find/${groupId}`)) as ListResponseBase<DataServiceEntity>;
  return response;
};

export const statusDataService = (params?: ApproveParams): Promise<any> => {
  return POST('core-svc/publish-api-request/approve', params);
};

export const statusDataReject = (params?: RejectParams): Promise<any> => {
  return POST('core-svc/publish-api-request/reject', params);
};
