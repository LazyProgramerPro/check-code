export const login = (data: any) => ({type: 'LOGIN', username: data.username, password: data.password});
export const loginStart = () => ({type: 'LOGIN_START', loading: true});
export const loginSuccess = (data: any, loading: boolean) => ({
  type: 'LOGIN_SUCCESS',
  isLogin: true,
  data: data,
  loading: loading,
});
export const loginError = () => ({type: 'LOGIN_ERROR', isLogin: false});
export const logout = () => ({type: 'LOGOUT', isLogin: false, data: null});
export const forgetPassword = () => ({type: 'FORGET_PASSWORD'});
