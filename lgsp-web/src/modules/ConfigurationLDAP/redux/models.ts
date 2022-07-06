import { AppError, ListResponseBase } from 'src/models/common';
import { ItemResponseBase } from 'src/models/common';
export interface Data {
  connectionName: string;
  connectionPassword: string;
  connectionUrl: string;
  description: string;
  domainName: string;
  id: string;
  userListFilter: string;
  userSearchBase: string;
  userSearchFilter: string;
  usernameAttribute: string;
}
export interface GetDataParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  total?: number;
  text?: string;
}

export interface GetDataAction {
  type: string;
  params?: GetDataParams;
  payload?: ListResponseBase<Data>;
  error?: AppError;
  total?: number;
}

export interface GetDataState {
  loading: boolean;
  params?: GetDataParams;
  total: number;
  rows: Data[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetDataResponse {
  error?: AppError;
  playload?: ListResponseBase<Data>;
}

//Delete
export interface DeleteParam {
  id: string;
}

//Update
export interface UpdateLDAPParams {
  connectionName: string;
  connectionPassword: string;
  connectionUrl: string;
  description: string;
  id: string;
  domainName: string;
  userListFilter: string;
  userSearchBase: string;
  userSearchFilter: string;
  usernameAttribute: string;
}

//Detail
export interface DataDetail {
  connectionName: string;
  connectionPassword: string;
  connectionUrl: string;
  createBy: string;
  createTime: string;
  description: string;
  domainName: string;
  id: string;
  status: string;
  userListFilter: string;
  userSearchBase: string;
  userSearchFilter: string;
  usernameAttribute: string;
}

export interface DataDetailParams {
  key?: string;
  status?: number;
  id?: string;
}
export interface DataDetailAction {
  type: string;
  params?: DataDetailParams;
  payload?: ItemResponseBase<DataDetail>;
  error?: AppError;
}

export interface DataDetailState {
  loading: boolean;
  params?: DataDetailParams;
  total: number;
  item?: DataDetail;
  error?: AppError;
  flag_reload: boolean;
}

export interface DataDetailResponse {
  error?: AppError;
  payload?: ItemResponseBase<DataDetail>;
}
