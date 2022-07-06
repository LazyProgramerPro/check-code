import { AppError, ListResponseBase } from 'src/models/common';
export interface ServiceData {
  name: string;
  description: string;
  numberApis: number;
  id: string;
}
export interface GetServiceParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  total?: number;
  text?: string;
  categoryId?: string;
}

export interface GetServiceAction {
  type: string;
  params?: GetServiceParams;
  payload?: ListResponseBase<ServiceData>;
  error?: AppError;
  total?: number;
}

export interface GetServiceState {
  loading: boolean;
  params?: GetServiceParams;
  total: number;
  rows: ServiceData[];
  error?: AppError;
  flag_reload: boolean;
  load_page?: boolean;
}

export interface GetServiceResponse {
  error?: AppError;
  playload?: ListResponseBase<ServiceData>;
}
///////////////Create//////////////////

export interface CreateServiceParams {
  description: string;
  name: string;
}

export interface CreateServiceAction {
  type: string;
  show?: boolean;
  params?: CreateServiceParams;
  error?: AppError;
}

export interface CreateServiceState {
  loading: boolean;
  show: boolean;
  params: CreateServiceParams;
  error?: AppError;
}

////////////////Delete////////////////////
export interface DeleteServiceParam {
  id: string;
}

export interface DeleteServiceAction {
  type: string;
  show?: boolean;
  param?: DeleteServiceParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

export interface DeleteServiceState {
  loading: boolean;
  show: boolean;
  param?: DeleteServiceParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

/////////////UpDate///////////////

export interface UpdateServiceParam {
  categoryId?: string;
  description: string;
  name: string;
}
export interface UpdateServiceAction {
  type: string;
  show?: boolean;
  originData?: ServiceData;
  params?: UpdateServiceParam;
  error?: AppError;
}

export interface UpdateServiceState {
  loading: boolean;
  show?: boolean;
  params?: UpdateServiceParam;
  error?: AppError;
  originData?: ServiceData;
}

////////////Check name//////////////
export interface Name {
  name?: string;
}
