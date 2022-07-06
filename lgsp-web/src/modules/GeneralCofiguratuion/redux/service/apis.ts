import { ItemResponseBase, ListResponseBase } from 'src/models/baseResponse';
import { GET } from '../../../../services';
export const general = async (params?: any): Promise<ItemResponseBase<any>> => {
  const response = (await GET('core-svc/system-configuration/', params)) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};
