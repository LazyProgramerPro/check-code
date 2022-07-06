import { AppError, ItemResponseBase, ListResponseBase } from '../../../models/baseResponse';

export interface DataServiceEntity {
  id: string;
  name: string;
  description: string;
  namespace: string;
  status: string;
  active: string;
  date: number;
  create_by: string;
  create_at: number;
}

export interface GetDataServiceParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  total?: number;
  text?: string;
}

export interface GetDataServiceAction {
  type: string;
  params?: GetDataServiceParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
  total?: number;
}

export interface GetDataServiceState {
  loading: boolean;
  params?: GetDataServiceParams;
  total: number;
  rows: any[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetDataServiceResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}

/////////////////////////////////////////////////////
export interface GetDataServiceDetailParams {
  id: string;
  page?: number;
  size?: number;
}
export interface GetSingleDataServiceAction {
  type: string;
  dataServiceId?: string;
  payload?: ItemResponseBase<DataServiceEntity>;
  error?: AppError;
}

export interface GetSingleDataServiceState {
  loading: boolean;
  dataServiceId?: string;
  error?: AppError;
  data?: DataServiceEntity;
  flag_reload: boolean;
}

export interface DataServiceData {
  id: string;
  name: string;
  description: string;
  namespace: string;
  status: string;
  createBy: string;
  time: string;
}

export interface CreateGroupRestApiParams {
  name: string;
  context: string;
  version: string;
  policies: string[];
  endpointUrl: string;
}

type ITaskEditting = CreateGroupRestApiParams | null;

export interface IFormDataService {
  loading?: boolean;
  isOpen?: boolean;
  isEdit?: boolean;
  taskEditting: ITaskEditting | null;
  error?: string;
}

export interface GetFormDataServiceAction {
  type: string;
  payload?: IFormDataService;
  error?: AppError;
}
/////////Create approve ///////////

export interface ApproveParams {
  requestId?: string;
}

export interface ApproveAction {
  type: string;
  param?: ApproveParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
  canChange?: boolean;
}

export interface ApproveState {
  loading: boolean;
  param?: ApproveParams;
  canChange?: boolean;
  error?: AppError;
  message?: string;
}

export interface GetDataServiceResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}
/////// Create reject //////

export interface RejectParams {
  reason: string;
  requestId?: string;
}

export interface RejectAction {
  type: string;
  params?: RejectParams;
  payload?: ListResponseBase<any>;
  error?: AppError;
  show?: boolean;
  originId?: string;
}

export interface RejectState {
  loading: boolean;
  params?: RejectParams;
  show?: boolean;
  error?: AppError;
  message?: string;
  originId?: string;
}
