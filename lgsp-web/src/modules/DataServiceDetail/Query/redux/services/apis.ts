import {GET} from "../../../../../services";
import {ItemResponseBase, ListResponseBase} from "../../../../../models/baseResponse";
import {QueryDataDetail, QueryEntity} from "../models";


export const searchQuery = async (params?: any): Promise<ListResponseBase<QueryEntity>> => {
  const response = (await GET('core-svc/query/search', params)) as ListResponseBase<QueryEntity>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const getQueryDetail = async (queryId?: any): Promise<ItemResponseBase<QueryDataDetail>> => {
  const response = (await GET(`core-svc/query/find/${queryId}`)) as ItemResponseBase<QueryDataDetail>;
  return response;
};

