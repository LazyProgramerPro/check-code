import { ListResponseBase } from 'src/models/baseResponse';
import { AppError, ItemResponseBase } from 'src/models/common';

export interface Information {
  id?: string;
  name: string;
  version: string;
  provider: string;
  lifeCycleStatus: string;
  description: string;
  cacheTimeout: number;
  createTime: string;
  deploymentUnit: string;
  categories: string[];
  keyManagers: string;
  register: string;
  departmentLevel: string;
  policies: string[];
  deploymentLevel: string;
  category?: string;
  httpEndpoint: string;
  httpsEndpoint: string;
}
export interface GetInformationParams {
  key?: string;
  status?: number;
  id?: string;
}

export interface GetInformationAction {
  type: string;
  params?: GetInformationParams;
  payload?: ItemResponseBase<Information>;
  error?: AppError;
}

export interface GetInformationState {
  loading: boolean;
  params?: GetInformationParams;
  total: number;
  item?: Information;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetInformationResponse {
  error?: AppError;
  playload?: ItemResponseBase<Information>;
}

// Document

export interface Document {
  documentId: string;
  name: string;
  type: string;
  summary: string;
  sourceType: string;
  filename: string;
  inlineContent: string;
  otherTypeName: string;
  visibility: string;
  createdTime: string;
  createdBy: string;
  lastUpdatedTime: string;
  lastUpdateBy: string;
}
export interface GetDocumentParams {
  key?: string;
  status?: number;
  id?: string;
  page?: number;
  size?: number;
  docId?: string;
}

export interface GetDocumentAction {
  type: string;
  params?: GetDocumentParams;
  payload?: ListResponseBase<Document>;
  error?: AppError;
}

export interface GetDocumentState {
  loading: boolean;
  params?: GetDocumentParams;
  total?: number;
  rows?: Document[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetDocumentResponse {
  error?: AppError;
  playload?: ListResponseBase<Document>;
}

//Production
export interface Production {
  id?: string;
  applicationTokenExpiryTime: string;
  consumerSecret: string;
  userAccessTokenExpiryTime: string;
  password_grant_type: string;
  refreshTime: string;
  expiryTime: string;
  consumerKey: string;
  client_credential: string;
}
export interface GetProductionParams {
  key?: string;
  status?: number;
  apiId?: string;
}

export interface GetProductionAction {
  type: string;
  params?: GetProductionParams;
  payload?: ItemResponseBase<Production>;
  error?: AppError;
}

export interface GetProductionState {
  loading: boolean;
  params?: GetProductionParams;
  total: number;
  item?: Production;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetProductionResponse {
  error?: AppError;
  playload?: ItemResponseBase<Production>;
}

//Update Production
export interface UpdateProductionParam {
  applicationTokenExpiryTime: number;
  expiryTime: number;
  refreshTime: number;
  userAccessTokenExpiryTime: number;
}

export interface UpdateProductionAction {
  type?: string;
  show?: boolean;
  originData?: Production;
  params?: UpdateProductionParam;
  error?: AppError;
}

export interface UpdateProductionState {
  loading: boolean;
  show?: boolean;
  params?: UpdateProductionParam;
  error?: AppError;
  originData?: Production;
}
//Test
export interface Test {
  id?: string;
  applicationTokenExpiryTime: string;
  consumerSecret: string;
  userAccessTokenExpiryTime: string;
  password_grant_type: string;
  refreshTime: string;
  expiryTime: string;
  consumerKey: string;
  client_credential: string;
}
export interface GetTestParams {
  key?: string;
  status?: number;
  apiId?: string;
}

export interface GetTestAction {
  type: string;
  params?: GetTestParams;
  payload?: ItemResponseBase<Test>;
  error?: AppError;
}

export interface GetTestState {
  loading: boolean;
  params?: GetTestParams;
  total: number;
  item?: Test;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetTestResponse {
  error?: AppError;
  playload?: ItemResponseBase<Test>;
}
//Update Test
export interface UpdateTestParam {
  applicationTokenExpiryTime: number;
  expiryTime: number;
  refreshTime: number;
  userAccessTokenExpiryTime: number;
}

export interface UpdateTestAction {
  type?: string;
  show?: boolean;
  originData?: Test;
  params?: UpdateTestParam;
  error?: AppError;
}

export interface UpdateTestState {
  loading: boolean;
  show?: boolean;
  params?: UpdateTestParam;
  error?: AppError;
  originData?: Test;
}

//Generate-token

export interface RenderToken {
  accessToken: string;
  validityTime: number;
}
export interface GetTokenParams {
  key?: string;
  status?: number;
}

export interface GetTokenAction {
  type: string;
  params?: GetTokenParams;
  payload?: ItemResponseBase<RenderToken>;
  error?: AppError;
}

export interface GetTokenState {
  loading: boolean;
  params?: GetTokenParams;
  total: number;
  item?: RenderToken;
  error?: AppError;
  flag_reload: boolean;
}

export interface GetTokenResponse {
  error?: AppError;
  playload?: ItemResponseBase<RenderToken>;
}

//Token sandbox
export interface RenderTokenSandBox {
  accessToken: string;
  validityTime: number;
}
export interface GetSandboxParams {
  key?: string;
  status?: number;
}

export interface GetSandboxAction {
  type: string;
  params?: GetSandboxParams;
  payload?: ItemResponseBase<RenderTokenSandBox>;
  error?: AppError;
}

export interface GetSandboxState {
  loading: boolean;
  params?: GetSandboxParams;
  total: number;
  item?: RenderTokenSandBox;
  error?: AppError;
  flag_reload: boolean;
}

//Đăng ký
export interface GetRegisterParams {
  key?: string;
  apiId?: string;
}

export interface GetRegisterAction {
  type: string;
  param?: GetRegisterParams;
  playload?: ListResponseBase<any>;
  error?: AppError;
  canChange?: boolean;
}

export interface GetRegisterState {
  loading: boolean;
  param?: GetRegisterParams;
  canChange?: boolean;
  error?: AppError;
  message?: string;
}
export interface GetRegisterResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}

export interface RegisterRequestParam {
  apiId: string;
}

//Hủy đăng ký
export interface GetUnRegisterParams {
  key?: string;
  apiId?: string;
}

export interface GetUnRegisterAction {
  type: string;
  param?: GetUnRegisterParams;
  playload?: ListResponseBase<any>;
  error?: AppError;
  canChange?: boolean;
}

export interface GetUnRegisterState {
  loading: boolean;
  param?: GetUnRegisterParams;
  canChange?: boolean;
  error?: AppError;
  message?: string;
}
export interface GetUnRegisterResponse {
  error?: AppError;
  playload?: ListResponseBase<any>;
}

export interface RegisterRequestParam {
  apiId: string;
}

////Detail///
export interface DetailParam {
  filename: string;
  summary: string;
  visibility: string;
  name: string;
}

export interface DetailAction {
  type: string;
  show?: boolean;
  originData?: Document;
  params?: DetailParam;
  error?: AppError;
}

export interface DetailState {
  loading: boolean;
  show?: boolean;
  params?: DetailParam;
  error?: AppError;
  originData?: Document;
}

//Download tài liệu
export interface DownloadDocument {
  docId: string;
}
