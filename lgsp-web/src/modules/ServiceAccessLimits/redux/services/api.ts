import { GET, POST } from 'src/services';
import { GetServiceAccessLimitParams, ServiceAccessLimit } from '../models';

export const getServiceAccessLimit = async (params?: GetServiceAccessLimitParams): Promise<any> => {
  const response = (await GET('core-svc/policy/subscription/search', params)) as any;
  return response;
};

export const getPermissionListApi = async (): Promise<any> => {
  const response = (await GET('core-svc/permission/list')) as any;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const createServiceAccessLimitApi = async (params?: ServiceAccessLimit): Promise<any> => {
  const response = (await POST('core-svc/policy/subscription/create', params)) as any;
  return response;
};

export const deleteServiceAccessLimitApi = async (id?: string): Promise<any> => {
  const params = {
    uuid: id,
  };
  const response = (await POST('core-svc/policy/subscription/delete', params)) as any;
  return response;
};

export const updateServiceAccessLimitApi = async (params?: ServiceAccessLimit): Promise<any> => {
  const response = (await POST('core-svc/policy/subscription/update', params)) as any;
  return response;
};

export const validateNameCreate = async (name?: string): Promise<any> => {
  const response = (await GET(`core-svc/policy/subscription/check-exist-name?name=${name}`)) as any;
  return response;
};
