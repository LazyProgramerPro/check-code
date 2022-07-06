import { ListResponseBase } from 'src/models/baseResponse';
import { GET, POST } from 'src/services';
import { DataService, DeleteDataServiceParam } from '../models';

export const getListDataService = async (params?: any): Promise<ListResponseBase<DataService>> => {
  const response = (await GET('core-svc/data-service/search', params)) as ListResponseBase<DataService>;
  return response;
};

export const deleteDataService = (param: DeleteDataServiceParam | undefined): Promise<any> => {
  return POST('core-svc/data-service/delete', param);
};
