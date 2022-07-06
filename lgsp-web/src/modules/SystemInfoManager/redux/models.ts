import { AppError, ListResponseBase } from 'src/models/baseResponse';
import { ItemResponseBase } from 'src/models/common';

export interface IMetadata {
  page?: number;
  pageSize?: number;
  total?: number;
}

export interface ISystemIntroInforState {
  data?: ISystemIntroInforEntity[];
  loading: boolean;
  error?: AppError;
  total: number;
  rowEditting?: ISystemIntroInforEntity | null;
  flag_reload: boolean;
}

export interface ISystemIntroInforParams {
  id?: string;
  page?: number;
  size?: number;
}

export interface ISystemIntroInforEntity {
  id: string;
  content: string;
  address: string;
  mobile: string;
  telephone: string;
  email: string;
  type: number;
  status: string;
  create_at: string;
  update_at: string;
  create_by: string;
  update_by: string;
  images?: string[];
  fax?: string;
}

// export interface ISystemIntroInforAction{
//   type: string,
//   params?: ISystemIntroInforParams,
//   payload?: ISystemIntroInforEntity
//   error?: AppError,
//   rowEditting?: ISystemIntroInforEntity | null
// }

export interface ISystemIntroInforAction {
  type: string;
  payload?: ListResponseBase<ISystemIntroInforEntity> | Partial<ISystemIntroInforEntity>;
  error?: AppError;
  params?: ISystemIntroInforParams;
  rowEditting?: ISystemIntroInforEntity | null;
}

// export interface ISystemIntroInforResponse {
//   response?: ListResponseBase<ISystemIntroInforEntity>,
// }

//GET_DATA
export interface DataSystemInfo {
  id: string;
  status?: string;
  type?: number;
  content: string;
  create_at?: number;
  update_at?: number;
  create_by?: string;
  update_by?: string;
}

export interface GetSystemInfoParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  id?: string;
}

export interface GetSystemInfoAction {
  type: string;
  params?: GetSystemInfoParams;
  payload?: ListResponseBase<DataSystemInfo>;
  error?: AppError;
}

export interface GetSystemInfoState {
  loading: boolean;
  params?: GetSystemInfoParams;
  total: number;
  rows?: DataSystemInfo[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetSystemInfoResponse {
  error?: AppError;
  playload?: ListResponseBase<DataSystemInfo>;
}

//Update
export interface UpdateContentParam {
  id: string;
  content: string;
}

export interface UpdateContentAction {
  type?: string;
  show?: boolean;
  originData?: DataSystemInfo;
  params?: UpdateContentParam;
  error?: AppError;
}

export interface UpdateContentState {
  loading: boolean;
  show?: boolean;
  params?: UpdateContentParam;
  error?: AppError;
  originData?: DataSystemInfo;
}

//Create
export interface CreateContentParams {
  content: string;
}

export interface CreateContentAction {
  type: string;
  show?: boolean;
  params?: CreateContentParams;
  error?: AppError;
  history?: any;
}

export interface CreateContentState {
  loading: boolean;
  show: boolean;
  params: CreateContentParams;
  error?: AppError;
}

///////Delete//////////
export interface DeleteInforParam {
  id: string;
}

export interface DeleteInforAction {
  type: string;
  show?: boolean;
  param?: DeleteInforParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

export interface DeleteInforState {
  loading: boolean;
  show: boolean;
  param?: DeleteInforParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

//Detail
export interface InforDetail {
  id: string;
  status: string;
  type: number;
  content: string;
  create_at: number;
  update_at: number;
  create_by: string;
  update_by: string;
}

export interface InforDetailParams {
  key?: string;
  status?: number;
  id?: string;
}
export interface InforDetailAction {
  type: string;
  params?: InforDetailParams;
  payload?: ItemResponseBase<InforDetail>;
  error?: AppError;
}

export interface InforDetailState {
  loading: boolean;
  params?: InforDetailParams;
  total: number;
  item?: InforDetail;
  error?: AppError;
  flag_reload: boolean;
}

export interface InforDetailResponse {
  error?: AppError;
  payload?: ItemResponseBase<InforDetail>;
}

//Public
export interface PublicInforParams {
  key?: string;
  id: string;
  content: string;
}

export interface PublicInforAction {
  type: string;
  param?: PublicInforParams;
  playload?: ListResponseBase<any>;
  error?: AppError;
  canChange?: boolean;
}

export interface PublicInforState {
  loading: boolean;
  param?: PublicInforParams;
  canChange?: boolean;
  error?: AppError;
  message?: string;
}
export interface PublicInforResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}
