import { ListResponseBase } from 'src/models/baseResponse';
import { GET, POST } from 'src/services';
import { CreateResourceParams, DeleteResourceParam, UpdateResourceParam } from '../models';

export const resource = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/policy/resource/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const getAllPolicy = async (): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/policy/subscription/getAll')) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const createResource = (params?: CreateResourceParams): Promise<any> => {
  return POST('core-svc/policy/resource/create', params);
};

export const deleteResource = (param: DeleteResourceParam | undefined): Promise<any> => {
  return POST('core-svc/policy/resource/delete', param);
};

export const updateResource = (params?: UpdateResourceParam): Promise<any> => {
  return POST('core-svc/policy/resource/update', params);
};

export const validateNameCreate = async (name?: string): Promise<any> => {
  const response = (await GET(`core-svc/policy/resource/check-exist-name?name=${name}`)) as any;
  return response;
};
