import { GET, POST } from 'src/services';
export const createLDAP = async (params?: any): Promise<any> => {
  const response = (await POST(`core-svc/user-store/create`, params)) as any;
  return response;
};

export const validateNameCreate = async (name?: string): Promise<any> => {
  const response = (await GET(`core-svc/user-store/check-exist?domainName=${name}`)) as any;
  return response;
};

export const connectLDAP = async (params?: any): Promise<any> => {
  const response = (await POST(`core-svc/user-store/test-connection`, params)) as any;
  return response;
};
