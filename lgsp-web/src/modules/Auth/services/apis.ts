import {LoginRequest, LoginResponse} from '../types';
import {GET, POST, PUT} from '../../../services';

export const login = (data?: LoginRequest): Promise<LoginResponse> => {
  return POST('account-svc/users/auth/login', data);
};

export const logoutService = (): Promise<LoginResponse> => {
  console.log("call logoutService");
  return GET('account-svc/users/auth/logout');
};

export const changePassword = async (data?: any): Promise<any> => {
  const id = data.id;
  delete data.id;
  return PUT('account-svc/employees/' + id + '/password', data);
};
