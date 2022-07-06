import { GET, POST } from 'src/services';
import { paramsCreatePermission, ParamSearch, paramsGetList } from './models';
import { ListResponseBase } from '../../../../models/baseResponse';
export const getPermissionList = async (params?: paramsGetList): Promise<any> => {
  const response = (await GET(
    `core-svc/permission/search?page=${params?.page}&size=${params?.size}&text=${params?.text}`,
  )) as any;
  return response;
};

export const getPermissionListComponents = async (params?: paramsGetList): Promise<any> => {
  const response = (await GET(
    `core-svc/permission/list?page=${params?.page}&size=${params?.size}&text=${params?.text}`,
  )) as any;
  return response;
};

export const getListUsers = async (params?: paramsGetList): Promise<any> => {
  const response = (await GET(
    `account-svc/account/search-normal?key=${params?.text}&page=${params?.page}&size=${params?.size}`,
  )) as any;
  return response;
};

export const getListDeploymentUnit = async (): Promise<any> => {
  const response = (await GET(`core-svc/public-api/deployment-unit/getAll`)) as any;
  return response;
};

export const createPermission = async (params?: paramsCreatePermission): Promise<any> => {
  const response = (await POST(`core-svc/permission/create`, params)) as any;
  return response;
};

export const updatePermission = async (params?: paramsCreatePermission): Promise<any> => {
  const response = (await POST(`core-svc/permission/update`, params)) as any;
  return response;
};

export const deletePermission = async (id?: string): Promise<any> => {
  const params = {
    id: id,
  };
  const response = (await POST(`core-svc/permission/delete`, params)) as any;
  return response;
};

export const validateNamePermission = (name: string): Promise<any> => {
  return GET(`core-svc/permission/check-exist-name?name=${name}`);
};

// export const selectAll == async (key?: ParamSearch): Promise<ListResponseBase<any>>  => {
//   const response = (await GET('core-svc/question/publish/search', key)) as ListResponseBase<any>;
//   return {
//     total: response.total,
//     rows: response?.rows || [],
//     code: response.code,
//     message: response.message,
//   };
// };

export const selectAll = async (key?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('account-svc/account/select-all?key=' + key)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};
