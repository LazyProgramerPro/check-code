import { AppError, ListResponseBase } from 'src/models/common';

export interface UserEntity {
  id?: string;
  username: string;
  password?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department: string;
  organization: string;
  address: string;
  under: string;
  role?: number;
  status: number;
}

export interface GetUserParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
}

export interface GetUserAction {
  type: string;
  params?: GetUserParams;
  payload?: ListResponseBase<UserEntity>;
  error?: AppError;
}

export interface GetUserState {
  loading: boolean;
  params?: GetUserParams;
  total: number;
  rows: UserEntity[];
  error?: AppError;
  flag_reload: boolean;
  load_page?: boolean;
}

export interface GetUserResponse {
  error?: AppError;
  payload?: ListResponseBase<UserEntity>;
}

export interface CreateUserParams {
  username: string;
  password?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department: string;
  organization: string;
  address: string;
  under: string;
  role?: string;
}
export interface UpdateUserParam {
  accountId: string;
  password?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department: string;
  organization: string;
  address: string;
  under: string;
  role?: number;
}

export interface RejectUserParam {
  reason: string;
  userId: string;
}

export interface CreateUserAction {
  type: string;
  show?: boolean;
  params?: CreateUserParams;
  error?: AppError;
  accountId?: string;
  rejectParam?: RejectUserParam;
}

export interface CreateUserState {
  loading: boolean;
  show: boolean;
  params?: CreateUserParams;
  error?: AppError;
}

export interface UpdateUserAction {
  type: string;
  show?: boolean;
  originData?: UserEntity;
  param?: UpdateUserParam;
  error?: AppError;
}

export interface UpdateUserState {
  loading: boolean;
  show: boolean;
  originData?: UserEntity;
  param?: UpdateUserParam;
  error?: AppError;
}

export interface DeleteUserParam {
  username: string;
}

export interface DeleteUserAction {
  type: string;
  show?: boolean;
  param?: DeleteUserParam;
  error?: AppError;
}

export interface DeleteUserState {
  loading: boolean;
  show: boolean;
  param?: DeleteUserParam;
  error?: AppError;
  canDelete?: boolean;
  message?: string;
}
