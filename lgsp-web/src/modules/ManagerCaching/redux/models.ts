import { AppError, ListResponseBase } from 'src/models/common';
export interface CachingData {
  apiId: string;
  apiName: string;
  cachingTime: number;
  organization: string;
}
export interface GetCachingParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
}

export interface GetCachingAction {
  type: string;
  params?: GetCachingParams;
  payload?: ListResponseBase<CachingData>;
  error?: AppError;
  total?: number;
}

export interface GetCachingState {
  loading: boolean;
  params?: GetCachingParams;
  total: number;
  rows: CachingData[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetCachingResponse {
  error?: AppError;
  playload?: ListResponseBase<CachingData>;
}

////////////Create////////////////
export interface CreateCachingParams {
  refreshTime: string;
}

export interface CreateCachingAction {
  type: string;
  show?: boolean;
  params?: CreateCachingParams;
  error?: AppError;
}

export interface CreateCachingState {
  loading: boolean;
  show: boolean;
  params: CreateCachingParams;
  error?: AppError;
}
