import { AppError, ListResponseBase } from '../../../models/baseResponse';

export interface ApiDocumentEntity {
  id?: string;
  name: string;
  summary: string;
  url?: string;
  file?: any;
  docType?: string;
  originFilename: string;
  fileName: string;
}

export interface GetApiDocumentParams {
  apiId: string;
  page?: number;
  size?: number;
}

export interface GetApiDocumentAction {
  type: string;
  params?: GetApiDocumentParams;
  payload?: ListResponseBase<ApiDocumentEntity>;
  error?: AppError;
}

export interface GetApiDocumentState {
  loading: boolean;
  params?: GetApiDocumentParams;
  total: number;
  rows: ApiDocumentEntity[];
  error?: AppError;
  lastUpdate?: string;
  flag_reload: boolean;
}

export interface CreateApiDocumentParam {
  apiId: string;
  name: string;
  summary: string;
  docType: string;
  url?: string;
  file?: any;
}

export interface UpdateApiDocumentParam extends CreateApiDocumentParam {
  docId: string;
}

export interface DeleteApiDocumentParam {
  id: string;
}

export interface CreateApiDocumentAction {
  type: string;
  show?: boolean;
  params?: CreateApiDocumentParam;
  error?: AppError;
}

export interface CreateApiDocumentState {
  loading: boolean;
  show?: boolean;
  params?: CreateApiDocumentParam;
  error?: AppError;
}

export interface UpdateApiDocumentAction {
  type: string;
  show?: boolean;
  originData?: ApiDocumentEntity;
  params?: UpdateApiDocumentParam;
  error?: AppError;
}

export interface UpdateApiDocumentState {
  loading: boolean;
  show?: boolean;
  params?: UpdateApiDocumentParam;
  error?: AppError;
  originData?: ApiDocumentEntity;
}

export interface DeleteApiDocumentAction {
  type: string;
  show?: boolean;
  param?: DeleteApiDocumentParam;
  error?: AppError;
}
export interface DeleteApiDocumentState {
  loading: boolean;
  show?: boolean;
  params?: DeleteApiDocumentParam;
  error?: AppError;
}

export interface ValidateNameProduction {
  id: string;
  name: string;
}
