import { ItemResponseBase } from 'src/models/baseResponse';
import { ListResponseBase } from '../../../../models/baseResponse';
import { GET } from 'src/services';
import { GetDataParams } from '../models';

export const searchLogUser = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/statistic/user', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    code: response.code,
    message: response.message,
    rows: response?.rows || [],
  };
};

export const searchLogDataService = async (params?: any): Promise<ItemResponseBase<any>> => {
  const response = (await GET('core-svc/statistic/data-service', params)) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

export const searchLogApi = async (params?: any): Promise<ItemResponseBase<any>> => {
  const response = (await GET('core-svc/statistic/api', params)) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

//Data
export const dataStatiscal = async (params?: any): Promise<ItemResponseBase<any>> => {
  const response = (await GET('core-svc/statistic/general', params)) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

// export const searchConnection = async (params?: any): Promise<ItemResponseBase<any>> => {
//   const response = (await GET('core-svc/statistic/connection', params)) as ItemResponseBase<any>;
//   return {
//     code: response.code,
//     message: response.message,
//     item: response.item,
//   };
// };

export const getAccount = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('account-svc/account/all', params)) as ListResponseBase<any>;

  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};
export const getId = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/publisher-apis/search', params)) as ListResponseBase<any>;

  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const searchConnection = async (params: GetDataParams): Promise<ListResponseBase<any>> => {
  const response = (await GET(
    `core-svc/statistic/connection?apiId=${params.apiId}&endDate=${params.endDate}&startDate=${params.startDate}&type=${params.type}&username=${params.username}`,
  )) as ListResponseBase<any>;

  return response;
  // return {
  //   total: response.total,
  //   rows: response?.rows || [],
  //   code: response.code,
  //   message: response.message,
  // };
};
