import { AppError, ListResponseBase } from 'src/models/common';

export interface DataService {
  id: string;
  name: string;
  namespace: string;
  description: string;
  status: string;
  active: boolean;
  date: number;
  month: number;
  create_by: string;
  create_at: number;
  update_by: string;
  update_at: number;
}

export interface GetListDataServiceParams {
  page?: number;
  size?: number;
  text?: string;
}

export interface GetListDataServiceAction {
  type: string;
  params?: GetListDataServiceParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
}

export interface GetListDataServiceState {
  loading: boolean;
  params?: GetListDataServiceParams;
  total: number;
  rows: any[];
  error?: AppError;
  flag_reload: boolean;
}

export interface DeleteDataServiceParam {
  id: string;
}

export interface DeleteDataServiceAction {
  type: string;
  show?: boolean;
  param?: DeleteDataServiceParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

export interface DeleteDataServiceState {
  loading: boolean;
  show: boolean;
  param?: DeleteDataServiceParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}
