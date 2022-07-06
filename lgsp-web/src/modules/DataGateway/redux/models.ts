import { ListResponseBase } from 'src/models/baseResponse';
import { AppError } from 'src/models/common';

export interface DataHostList {
  host: string;
  context: string;
  httpPort: number;
  httpsPort: number;
}
export interface DataGateway {
  id: string;
  name: string;
  displayName: string;
  description: string;
  hostList: DataHostList[];
}

export interface GetDataGatewayParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  text?: string;
  gatewayId?: string;
}

export interface GetDataGatewayAction {
  type: string;
  params?: GetDataGatewayParams;
  payload?: ListResponseBase<DataGateway>;
  error?: AppError;
}

export interface GetDataGatewayState {
  loading: boolean;
  params?: GetDataGatewayParams;
  total: number;
  rows?: DataGateway[];
  error?: AppError;
  flag_reload: boolean;
  load_page?: boolean;
}

export interface GetDataGatewayResponse {
  error?: AppError;
  playload?: ListResponseBase<DataGateway>;
}
///////////////////Delete///////////////////
export interface DeleteGatewayParam {
  id: string;
}

export interface DeleteGatewayAction {
  type: string;
  show?: boolean;
  param?: DeleteGatewayParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

export interface DeleteGatewayState {
  loading: boolean;
  show: boolean;
  param?: DeleteGatewayParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

////////////////Create/////////////////
export interface HostListParams {
  context: string;
  host: string;
  httpPort: number;
  httpsPort: number;
}

export interface CreateGatewayParams {
  description: string;
  displayName: string;
  name: string;
  hostList: HostListParams[];
}

export interface CreateGatewayAction {
  type: string;
  show?: boolean;
  params?: CreateGatewayParams;
  error?: AppError;
}

export interface CreateGatewayState {
  loading: boolean;
  show: boolean;
  params: CreateGatewayParams;
  error?: AppError;
}

////////////Update////////////
export interface UpdateGatewayParam {
  description: string;
  displayName: string;
  gatewayId: string;
  hostList: HostListParams[];
  name: string;
}
export interface UpdateGatewayAction {
  type: string;
  show?: boolean;
  originData?: DataGateway;
  params?: UpdateGatewayParam;
  error?: AppError;
}

export interface UpdateGatewayState {
  loading: boolean;
  show?: boolean;
  params?: UpdateGatewayParam;
  error?: AppError;
  originData?: DataGateway;
}

////////////Export//////////
export interface ExportParam {
  text: string;
}
