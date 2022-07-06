import { GET, POST } from 'src/services';
import { ParamsOldPassword, ParamsUpdatePassword } from './models';

export const changePasswordSelfApi = async (params?: ParamsUpdatePassword): Promise<any> => {
  const response = (await POST(`account-svc/account/change-password-self`, params)) as any;
  return response;
};

export const validatePassWordAccount = (params?: ParamsOldPassword): Promise<any> => {
  return POST('account-svc/account/check-old-password', params);
};
