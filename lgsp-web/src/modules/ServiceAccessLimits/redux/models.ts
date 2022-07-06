import { AppError, ListResponseBase } from 'src/models/common';

export interface ServiceAccessLimit {
  dataAmount: number;
  dataUnit: string;
  description: string;
  name: string;
  permissionType: 'none' | 'allow' | 'deny';
  requestCount: number;
  permissions: string[];
  timeUnit: 'min' | 'hour' | 'days' | 'month';
  type: 'bandwidthVolume' | 'requestCount';
  unitTime: number;
  quotaType?: string;
  quota?: number;
  quotaUnit?: string;
  uuid?: string;
}

export interface GetServiceAccessLimitParams {
  page?: number;
  size?: number;
  text?: string;
}

export interface PermissionAccessLimit {
  id: string;
  name: string;
  organization?: string;
  users?: string;
  createTime?: string;
}

export interface ServiceAccessLimitState {
  loading?: boolean;
  show?: boolean;
  params?: GetServiceAccessLimitParams;
  servicesAccess?: ServiceAccessLimit[];
  servicesAccessEdit?: ServiceAccessLimit;
  permissionList?: PermissionAccessLimit[];
  error?: AppError;
  id?: string;
  total?: number;
}

export interface ServiceAccessLimitAction {
  type: string;
  show?: boolean;
  params?: GetServiceAccessLimitParams;
  permissionList?: PermissionAccessLimit[];
  paramsCreate?: ServiceAccessLimit;
  payload?: ListResponseBase<any>;
  error?: AppError;
  id?: string;
  name?: string;
}
