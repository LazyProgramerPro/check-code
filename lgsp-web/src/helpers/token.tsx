let TOKEN: any = null;

export const setToken = (_token: any) => {
  TOKEN = _token;
};

export const getToken = () => {
  return TOKEN;
};
