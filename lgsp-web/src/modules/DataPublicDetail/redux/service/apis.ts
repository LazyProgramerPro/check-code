import { ItemResponseBase, ListResponseBase } from 'src/models/baseResponse';
import { EXPORT, EXPORT2, GET, POST } from '../../../../services';
import {
  DownloadDocument,
  GetDocumentParams,
  GetInformationParams,
  GetRegisterParams,
  GetSandboxParams,
  GetTestParams,
  GetTokenParams,
  RegisterRequestParam,
  UpdateProductionParam,
  UpdateTestParam,
} from '../models';
import { GetProductionParams } from '../models';
export const information = async (params?: GetInformationParams): Promise<ItemResponseBase<any>> => {
  const response = (await GET(`core-svc/public-api/${params?.id}/information`)) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

export const documentData = async (params?: GetDocumentParams): Promise<ListResponseBase<any>> => {
  const response = (await GET(`core-svc/public-api/${params?.id}/documents`, params)) as ListResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    total: response.total,
    rows: response.rows,
  };
};

export const production = async (params?: GetProductionParams): Promise<ItemResponseBase<any>> => {
  const response = (await GET(
    `core-svc/application/detail?apiId=${params?.apiId}&type=production`,
  )) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

export const test = async (params?: GetTestParams): Promise<ItemResponseBase<any>> => {
  const response = (await GET(`core-svc/application/detail?apiId=${params?.apiId}&type=sandbox`)) as ItemResponseBase<
    any
  >;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

export const token = async (params?: GetTokenParams): Promise<ItemResponseBase<any>> => {
  const response = (await GET(`core-svc/application/generate-token?type=production`)) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};
export const sandbox = async (params?: GetSandboxParams): Promise<ItemResponseBase<any>> => {
  const response = (await GET(`core-svc/application/generate-token?type=sandbox`)) as ItemResponseBase<any>;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

export const generateTestKey = async (apiId: string): Promise<any> => {
  const response = await GET(`core-svc/publisher-apis/${apiId}/generate-key-test`);
  return response;
};

export const getApiDefinition = async (apiId: string): Promise<any> => {
  return await GET(`core-svc/public-api/${apiId}/definition`);
  // return await GET(`core-svc/publisher-apis/${apiId}/definition`);
};

//Đăng kí
export const register = async (params?: GetRegisterParams): Promise<any> => {
  const object = { apiId: params?.apiId };
  return POST('core-svc/subscription/register', object);
};

export const registerService = async (param: RegisterRequestParam): Promise<any> => {
  return await POST('core-svc/subscription/register', param);
};

//Hủy đăng kí
export const unregister = async (params?: GetRegisterParams): Promise<any> => {
  const object = { apiId: params?.apiId };
  return POST('core-svc/subscription/unregister', object);
};

//Tải file tài liệu
export const downloadDocument = async (docId: string, filename: string): Promise<{}> => {
  const response = (await EXPORT(`core-svc/public-api/${docId}/download`)) as any;
  const url = window.URL.createObjectURL(new Blob([response]));
  console.log('first', filename);
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  return response;
};
//Update Production
export const updateProduction = (params?: UpdateProductionParam): Promise<any> => {
  return POST('core-svc/application/update-production', params);
};

//UpdateTest
export const updateTest = (params?: UpdateTestParam): Promise<any> => {
  return POST('core-svc/application/update-sandbox', params);
};
