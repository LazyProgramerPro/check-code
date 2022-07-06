/* --- STATE --- */
export interface LoginState {
  responseLogin: Object;
  data: Object;
  stepLogin: number;
  reloadrecaptcha: boolean;
  loginFinish: boolean;
}
