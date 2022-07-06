import {ResponseBase} from '../../models/common';
import {UserEntity} from "../User/redux/models";

export interface LoginInput {
  username: string;
  password: string;
  remember: boolean;
  previous: string;
}

export interface  LogoutRequest{
  check: boolean;
}

export interface LoginRequest{
  username: string;
  password: string;
}

export interface LoginResponse extends ResponseBase {
  user: UserEntity;
  token: string;
  permission: string[];
  is_manager: boolean | number;
  is_admin: boolean | number;
  is_hr: boolean | number;
  is_create_for_other: boolean | number;
  department_names: string[];
  username: string;
  permissions: string[];
  roles: string[];
  role: number;
}
