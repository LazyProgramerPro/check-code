export interface RC {
  code: number;
  desc: string;
}

export interface IPagination {
  page: number,
  size: number
}

export interface ResponseBase2 {
  code: number,
  message: string
}

export interface ResponseBase {
  rc: RC;
}

export interface ListResponseBase<T> extends ResponseBase {
  total: number;
  rows: T[];
  camera_area_type?: number;
}

export interface ListResponseBases<T> extends ResponseBase {
  result: T[];
}

export interface ItemResponseBase<T> extends ResponseBase {
  item: T;
}

export interface CommonSearchParam{
  text: string,
  page: number,
  size: number
}
// actions base for redux actions
export interface ActionBase<T> {
  type: string;
  params?: any;
  payload?: T;
  error?: AppError;
  id?: string;
}

export interface DeleteInput {
  id: string;
}

export class AppError extends Error {
  code = 0;

  constructor(message: string, code: number = 0) {
    super(message);
    this.code = code;
  }
}
export enum  EPolices {
  Unlimited = 'Unlimited',
  Gold = '50KPerMin',
  Silver = '20KPerMin',
  Bronze = '10KPerMin'
}

export enum EThroughput  {
  SPECIFY= "Specify",
  UNLIMITED = "Unlimited"
}

export enum  ETransport {
  http = 'http',
  https = 'https',
}

export enum  EGroupApiType {
  rest = 'REST',
  soap = 'SOAP',
}

export enum  EEndpointType {
  http = 'http',
  load_balancer = 'load_balancer',
  failover = 'failover'
}

export enum EHttpMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS= 'OPTIONS'
}


export const PAGE = 1;
export const SIZE = 10;

export const policyMap = new Map([
    ["Gold", "5000 yêu cầu mỗi phút"],
    ["Silver", "2000 yêu cầu mỗi phút"],
    ["Bronze", "1000 yêu cầu mỗi phút"],
    ["Unlimited", "Không giới hạn yêu cầu truy cập"]
  ]);

export const policyResourceMap = new Map([
    ["10KPerMin", "10000 yêu cầu mỗi phút"],
    ["20KPerMin", "20000 yêu cầu mỗi phút"],
    ["50KPerMin", "50000 yêu cầu mỗi phút"],
    ["Unlimited", "Không giới hạn truy cập"]
]);

export enum UserRole {
  PROVIDER = 'provider',
  CONSUMER = 'consumer',
  ADMIN = 'admin',
  ADMIN_VALUE = 0,
  PROVIDER_VALUE = 1,
  CONSUMER_VALUE = 2,
}

export enum UserStatus {
  BANNED = 0,
  ACTIVE = 1,
  PENDING = 2,
}

export enum Under{
  INTERNAL = 'Trong bộ KH&ĐT',
  EXTERNAL = 'Ngoài bộ KH&ĐT'
}
