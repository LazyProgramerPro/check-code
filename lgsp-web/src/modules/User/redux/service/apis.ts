import { GET, POST } from '../../../../services';
import { CreateUserParams, DeleteUserParam, RejectUserParam, UpdateUserParam, UserEntity } from '../models';
import { ItemResponseBase, ListResponseBase } from '../../../../models/baseResponse';

export const searchUsers = async (params?: any): Promise<ListResponseBase<UserEntity>> => {
  const response = (await GET('account-svc/account/search', params)) as ListResponseBase<UserEntity>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const getUser = async (accountId: any): Promise<ItemResponseBase<UserEntity>> => {
  const response = (await GET(`account-svc/account/${accountId}`)) as ItemResponseBase<UserEntity>;
  return response;
};

export const getUserByUsername = async (param: any): Promise<ItemResponseBase<UserEntity>> => {
  const response = (await GET(`account-svc/account/detail`, param)) as ItemResponseBase<UserEntity>;
  return response;
};

export const createUser = (params?: CreateUserParams): Promise<any> => {
  return POST('account-svc/account/admin/create-account', params);
};

export const updateUser = (param?: UpdateUserParam): Promise<any> => {
  return POST('account-svc/account/update-account', param);
};

export const deleteUser = (param: DeleteUserParam | undefined): Promise<any> => {
  return POST('account-svc/account/admin/delete-account', param);
};

export const checkDeleteUser = (param: DeleteUserParam | undefined): Promise<any> => {
  return POST('account-svc/account/check-delete-account', param);
};

export const checkExistUsername = (text: string): Promise<any> => {
  return GET(`account-svc/account/check-exist-username?username=${text}`);
};

export const checkExistEmail = (text: string): Promise<any> => {
  return GET(`account-svc/account/check-exist-email?email=${text}`);
};

export const checkExistUsernameNoAuth = (text: string): Promise<any> => {
  return GET(`account-svc/account/no-auth/check-exist-username?username=${text}`);
};

export const checkExistEmailNoAuth = (text: string): Promise<any> => {
  return GET(`account-svc/account/no-auth/check-exist-email?email=${text}`);
};

export const checkExistPhone = (text: string): Promise<any> => {
  return GET(`account-svc/account/check-exist-phone?phone=${text}`);
};

//ACCEPT_USERS

export const acceptUserApi = async (accountId?: string): Promise<any> => {
  const request = { userId: accountId };
  const response = (await POST(`account-svc/account/admin/accept-account`, request)) as any;
  return response;
};

// REJECT_USERS

export const rejectUserApi = async (rejectParam?: RejectUserParam): Promise<any> => {
  const response = (await POST(`account-svc/account/admin/reject-account`, rejectParam)) as any;
  return response;
};
