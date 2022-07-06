import {ListResponseBase} from "../../../../models/baseResponse";
import {GET} from "../../../../services";
import {RestApiEntity} from "../models";

export const searchRestApi = async (params?: any): Promise<ListResponseBase<RestApiEntity>> => {
  const response = (await GET('core-svc/rest-api/search', params)) as ListResponseBase<RestApiEntity>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};
