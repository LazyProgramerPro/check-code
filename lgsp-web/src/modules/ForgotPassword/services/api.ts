import { POST } from '../../../services';

export const sendRequestResetPasswordApi = (email: string): Promise<any> => {
  const param = {
    email: email,
  };
  return POST('account-svc/account/public/reset-password-request', param);
};
