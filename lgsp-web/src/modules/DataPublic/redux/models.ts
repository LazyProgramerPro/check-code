import { AppError, ListResponseBase } from 'src/models/common';

export interface Data {
  id?: string;
}
export interface GetDataParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  total?: number;
  text?: string;
  category?: string;
  provider?: string;
  startDate?: string;
  endDate?: string;
}
export interface GetDataAction {
  type: string;
  params?: GetDataParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
  total?: number;
}
export interface GetDataState {
  loading: boolean;
  params?: GetDataParams;
  total: number;
  rows: any[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetDataResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}

//Organization
// export interface GetOrganizationParams {
//   page?: number;
//   size?: number;
//   key?: string;
//   status?: number;
// }

export interface DataOrganization {
  name: string;
  id: string;
}
export interface GetOrganizationAction {
  type: string;
  payload?: ListResponseBase<DataOrganization>;
  error?: AppError;
}

export interface GetOrganizationState {
  loading: boolean;
  total: number;
  rows: DataOrganization[];
  error?: AppError;
  flag_reload: boolean;
}
export interface GetOrganizationResponse {
  error?: AppError;
  playload?: ListResponseBase<DataOrganization>;
}
//Category
export interface GetCategoryParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
}
export interface GetCategoryAction {
  type: string;
  params?: GetCategoryParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
}
export interface GetCategoryState {
  loading: boolean;
  params?: GetCategoryParams;
  total: number;
  rows: any[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetCategoryResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}
