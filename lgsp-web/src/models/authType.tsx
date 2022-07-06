export const LOGIN = 'login';
export const LOGIN_START = 'login_start';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';
export const LOGOUT = 'logout';
export const FORGET_PASSWORD = 'forget_password';

export interface LoginVariables {
  username: string;
  password: string;
}

export interface LoginOutput {
  permission: [];
  employee: {
    department: string | null;
    position: string | null;
    id: string | null;
    create_time: number | null;
    update_time: number | null;
    department_id: string | null;
    home_town: string | null;
    email: string | null;
    code: string | null;
    phone: string | null;
    full_name: string | null;
    first_name: string | null;
    last_name: string | null;
    gender: number | null;
    status: string | null;
  };
  token: string;
  rc: {
    code: number | null;
    desc: string | null;
  };
}
