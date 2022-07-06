import { ListResponseBase } from '../../../../models/baseResponse';
import { GET } from '../../../../services';
export const searchLog = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/logging/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};
