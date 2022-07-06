import { ItemResponseBase, ListResponseBase } from '../../../../models/baseResponse';
import { GET, POST} from '../../../../services';
import { DataDetailParams, DeleteParam, UpdateLDAPParams } from '../models';

export const searchData = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/user-store/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};
export const deleteData = (param: DeleteParam | undefined): Promise<any> => {
  return POST('core-svc/user-store/delete', param);
};
 
export const updateData = async (params?: UpdateLDAPParams): Promise<any> => {
  const response = (await POST(`core-svc/user-store/update`, params)) as any;
  return response;
};

//Detail
export const detailData = async (params: DataDetailParams): Promise<ItemResponseBase<any>> => {
  const response = (await GET(`core-svc/user-store/${params?.id}`)) as any;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};
