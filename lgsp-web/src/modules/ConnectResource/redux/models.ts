import { ListResponseBase } from 'src/models/baseResponse';
import { AppError } from 'src/models/common';

export interface Resource {
  id: number;
  uuid: string;
  name: string;
  displayName: string;
  description: string;
  quotaType: string;
  quota: number;
  quotaUnit: string;
  unitTime: number;
  timeUnit: string;
  deployed: boolean;
}

export interface GetResourceParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  total?: number;
  text?: string;
  uuid?: string;
}

export interface GetResourceAction {
  type: string;
  params?: GetResourceParams;
  payload?: ListResponseBase<Resource>;
  error?: AppError;
}

export interface GetResourceState {
  loading: boolean;
  params?: GetResourceParams;
  total: number;
  rows?: Resource[];
  error?: AppError;
  flag_reload: boolean;
  load_page?: boolean;
}

export interface GetResourceResponse {
  error?: AppError;
  playload?: ListResponseBase<Resource>;
}

/////////////////////Create///////////////////
export interface CreateResourceParams {
  dataAmount: number;
  dataUnit: string;
  description: string;
  name: string;
  requestCount: number;
  timeUnit: string;
  type: string;
  unitTime: number;
}

export interface CreateResourceAction {
  type: string;
  show?: boolean;
  params?: CreateResourceParams;
  error?: AppError;
}

export interface CreateResourceState {
  loading: boolean;
  show: boolean;
  params: CreateResourceParams;
  error?: AppError;
}

////////////////////Delete///////////////////
export interface DeleteResourceParam {
  uuid: string;
}

export interface DeleteResourceAction {
  type: string;
  show?: boolean;
  param?: DeleteResourceParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

export interface DeleteResourceState {
  loading: boolean;
  show: boolean;
  param?: DeleteResourceParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

/////////////UpDate///////////////

export interface UpdateResourceParam {
  description: string;
  quota: number;
  quotaType: string;
  quotaUnit: string;
  timeUnit: string;
  unitTime: number;
  uuid: string;
}
export interface UpdateResourceAction {
  type: string;
  show?: boolean;
  originData?: Resource;
  params?: UpdateResourceParam;
  error?: AppError;
}

export interface UpdateResourceState {
  loading: boolean;
  show?: boolean;
  params?: UpdateResourceParam;
  error?: AppError;
  originData?: Resource;
}
