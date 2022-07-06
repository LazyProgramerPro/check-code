import { authService } from 'services/authService';
export const getToken = () => {
  const userToken = authService.getAccessToken();
  if (userToken) {
    return userToken;
  } else {
    return null;
  }
};
export const isEmpty = v => {
  return !!v && v.constructor === Object && Object.keys(v).length === 0;
};
