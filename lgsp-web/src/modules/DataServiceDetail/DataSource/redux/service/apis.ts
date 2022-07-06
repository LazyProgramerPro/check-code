import {ListResponseBase} from "../../../../../models/baseResponse";
import {GET} from "../../../../../services";
import {DataSourceEntity} from "../models";

export const searchDataSource = async (params?: any): Promise<ListResponseBase<DataSourceEntity>> => {
  const response = (await GET('core-svc/data-source/search', params)) as ListResponseBase<DataSourceEntity>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const getDataSourceDetail = async (groupId?: any): Promise<ListResponseBase<DataSourceEntity>> => {
  const response = (await GET(`core-svc/data-source/find/${groupId}`)) as ListResponseBase<DataSourceEntity>;
  return response;
};
