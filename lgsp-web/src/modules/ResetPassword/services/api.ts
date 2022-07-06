import { POST } from '../../../services';
import { ChangePasswordToken } from './models';

export const changePasswordTokenApi = (params: ChangePasswordToken): Promise<any> => {
  return POST('account-svc/account/public/change-password-token', params);
};
