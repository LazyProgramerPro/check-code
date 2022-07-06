import { AppError, ItemResponseBase, ListResponseBase } from 'src/models/common';

//User
export interface GetLogUserParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
}
export interface GetLogUserAction {
  type: string;
  params?: GetLogUserParams;
  payload?: ItemResponseBase<any>;
  error?: AppError;
}
export interface GetLogUserState {
  loading: boolean;
  params?: GetLogUserParams;
  total: number;
  item: any;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetLogUserResponse {
  error?: AppError;
  playload?: ItemResponseBase<any>;
}

//data-service
export interface GetDataServiceParams {
  page?: number;
  size?: number;
  text?: string;
  status?: number;
}
export interface GetDataServiceAction {
  type: string;
  params?: GetDataServiceParams;
  payload?: ItemResponseBase<any>;
  error?: AppError;
}
export interface GetDataServiceState {
  loading: boolean;
  params?: GetDataServiceParams;
  total: number;
  item: any;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetLogUserResponse {
  error?: AppError;
  playload?: ItemResponseBase<any>;
}

//API
export interface GetApiParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
}
export interface GetApiAction {
  type: string;
  params?: GetApiParams;
  payload?: ItemResponseBase<any>;
  error?: AppError;
}
export interface GetApiState {
  loading: boolean;
  params?: GetApiParams;
  total: number;
  item: any;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetApiResponse {
  error?: AppError;
  playload?: ItemResponseBase<any>;
}

//Data
export interface DataStatiscal {
  users: number;
  services: number;
  dataServices: number;
}

export interface DataStatiscalParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
}
export interface DataStatiscalAction {
  type: string;
  params?: GetApiParams;
  payload?: ItemResponseBase<any>;
  error?: AppError;
}
export interface DataStatiscalState {
  loading: boolean;
  params?: GetApiParams;
  total: number;
  item: DataStatiscal;
  error?: AppError;
  flag_reload: boolean;
}

//GetAccount
export interface GetAccountParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  text?: string;
}
export interface GetAccountAction {
  type: string;
  params?: GetAccountParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
}
export interface GetAccountState {
  loading: boolean;
  params?: GetAccountParams;
  total: number;
  rows: any[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetAccountResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}

//GetId
export interface GetIdParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  text?: string;
}
export interface GetIdAction {
  type: string;
  params?: GetIdParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
}
export interface GetIdState {
  loading: boolean;
  params?: GetIdParams;
  total: number;
  rows: any[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetIdResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}

//Connection
// export interface ConnectionParams {
//   apiId: string;
//   endDate: string;
//   startDate: string;
//   type: string;
//   username: string;
// }

//CONNECTION
export interface Data {
  x: string;
  y: number;
}

// export interface SuccessData {
//   total?: number;
//   rows: Data[];
// }
// export interface FailedData {
//   total?: number;
//   rows: Data[];
// }
export interface DataItem {
  successData: Data[];
  failedData: Data[];
}

export interface GetDataParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  apiId?: string;
  endDate?: string;
  startDate?: string;
  type?: string;
  username?: string;
}

export interface GetDataAction {
  type: string;
  params?: GetDataParams;
  payload?: ItemResponseBase<DataItem>;
  error?: AppError;
  total?: number;
}

export interface GetDataState {
  loading: boolean;
  params?: GetDataParams;
  total: number;
  item?: DataItem;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetDataResponse {
  error?: AppError;
  playload?: ItemResponseBase<DataItem>;
}
