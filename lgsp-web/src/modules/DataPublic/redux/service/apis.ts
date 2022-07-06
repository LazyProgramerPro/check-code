import { ListResponseBase } from '../../../../models/baseResponse';
import { GET } from '../../../../services';

export const searchDatas = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/public-api/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};
export const getAllDeploymentUnit = async (): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/public-api/deployment-unit/getAll')) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const getAllOrganization = async (): Promise<ListResponseBase<any>> => {
  const response = (await GET('account-svc/organization/')) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const category = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/category/all')) as ListResponseBase<any>;

  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};
