import { AppError, ListResponseBase } from '../../../models/baseResponse';
import { EPolices, ETransport } from 'src/models/common';

export enum ELifeCycleStatus {
  PUBLISH = 'PUBLISHED',
  CREATED = 'CREATED',
  DEPLOYED = 'DEPLOYED',
}

export interface IRestApiObject {
  id: string;
  uuid: string;
  name: string;
  description: string;
  context: string;
  version: string;
  endpointUrl: string;
  production_endpoint_url: string;
  sandbox_endpoint_url: string;
  status: string;
  active: string;
  create_by: string;
  create_at: number;
  date: number;
  file: string | File;
  type: string;
  defaultVersion: boolean;
  myId: string;
  policies: EPolices[];
  transport: ETransport[];
  categories: string[];
  reason: string;
  [key: string]: any;

  loading: boolean;
}

export interface IGroupApiParams {
  text?: string;
  status?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export interface GetGroupRestApiDetailParams {
  id: string;
  page?: number;
  size?: number;
}

export interface GetGroupRestApiAction {
  type: string;
  params?: IGroupApiParams;
  payload?: ListResponseBase<IRestApiObject>;
  error?: AppError;
}

export interface IGroupApiAction {
  type: string;
  params?: IGroupApiParams;
  payload?: Partial<IRestApiObject> | FormData;
  error?: AppError;
  rowEditting?: IRestApiObject | null;
  callback?: () => void;
}

export interface IGroupApiState {
  loading: boolean;
  params?: IGroupApiParams;
  error?: AppError;
  total: number;
  data: IRestApiObject[] | IRestApiObject;
  flag_reload: boolean;
  rowEditting: IRestApiObject | null;
  rows: any[];
}

export interface GroupRestApiData {
  id: string;
  uuid: string;
  name: string;
  description: string;
  context: string;
  version: string;
  endpoint_url: string;
  policies: string;
  status: string;
  active: string;
  createBy: string;
  time: string;
}

export interface CreateGroupRestApiParams {
  apiType: string;
  name: string;
  context: string;
  version: string;
  deploymentLevel: string;
  endpointUrl: string;
  file?: File;
  wsdlUrl?: string;
}

export interface CreateGroupRestApiAction {
  type: string;
  show?: boolean;
  params?: CreateGroupRestApiParams;
  addPointParam?: string;
  error?: AppError;
  history?: any;
}

export interface CreateGroupRestApiState {
  loading: boolean;
  show: boolean;
  params?: CreateGroupRestApiParams;
  error?: AppError;
}
