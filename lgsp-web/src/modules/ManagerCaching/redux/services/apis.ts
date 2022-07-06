import { ListResponseBase } from '../../../../models/baseResponse';
import { GET, POST } from '../../../../services';
import { CreateCachingParams } from '../models';

export const searchCaching = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/caching/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const createCaching = (params?: CreateCachingParams): Promise<any> => {
  return POST('core-svc/caching/create', params);
};
