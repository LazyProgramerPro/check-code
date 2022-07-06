import { ListResponseBase } from '../../../../models/baseResponse';
import { GET, POST } from '../../../../services';
import { CreateServiceParams, DeleteServiceParam, Name, UpdateServiceParam } from '../models';
export const searchService = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/category/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const createService = (params?: CreateServiceParams): Promise<any> => {
  return POST('core-svc/category/create', params);
};

export const deleteService = (param: DeleteServiceParam | undefined): Promise<any> => {
  return POST('core-svc/category/delete', param);
};
export const updateService = (params?: UpdateServiceParam): Promise<any> => {
  return POST('core-svc/category/update', params);
};

export const validateNameCreate = async (name?: Name): Promise<any> => {
  const response = (await POST(`core-svc/category/check-exist-name`, name)) as any;
  return response;
};
