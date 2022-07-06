import { ListResponseBase } from 'src/models/baseResponse';
import { AppError } from 'src/models/common';

export interface DataDriver {
  id: string;
  name: string;
  file_path: string;
  type: number;
  version: string;
  create_at: string;
  update_at: string;
  create_by: string;
  update_by: string;
  isDefault: boolean;
  fileName: string;
}

export interface GetDriverParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  total?: number;
  name?: string;
  id?: string;
  file_path?: string;
}

export interface GetDriverAction {
  type: string;
  params?: GetDriverParams;
  payload?: ListResponseBase<DataDriver>;
  error?: AppError;
}

export interface GetDriverState {
  loading: boolean;
  params?: GetDriverParams;
  total: number;
  rows?: DataDriver[];
  error?: AppError;
  flag_reload: boolean;
  load_page?: boolean;
}

export interface GetDriverResponse {
  error?: AppError;
  playload?: ListResponseBase<DataDriver>;
}

////////////////////Create///////////////////
export interface CreateDriverParams {
  file: any;
  name: string;
  type: number;
  version: string;
}
export interface CreateDriverAction {
  type: string;
  show?: boolean;
  params?: CreateDriverParams;
  error?: AppError;
}

export interface CreateDriverState {
  loading: boolean;
  show: boolean;
  params: CreateDriverParams;
  error?: AppError;
}

////////////////////Delete///////////////////
export interface DeleteDriverParam {
  id: string;
}

export interface DeleteDriverAction {
  type: string;
  show?: boolean;
  param?: DeleteDriverParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

export interface DeleteDriverState {
  loading: boolean;
  show: boolean;
  param?: DeleteDriverParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}

/////////////////Update/////////////////
export interface UpdateDriverParam {
  id: string;
  file: any;
  version: string;
  type: number;
  name: string;
}

export interface UpdateDriverAction {
  type: string;
  show?: boolean;
  originData?: DataDriver;
  params?: UpdateDriverParam;
  error?: AppError;
}

export interface UpDateDriverState {
  loading: boolean;
  show?: boolean;
  params?: UpdateDriverParam;
  error?: AppError;
  originData?: DataDriver;
}

export interface DownloadDriverParam {
  name: string;
  version: string;
}
