import { GET, POST } from 'src/services';
import { InfoFooter } from './models';

export const getSystemIntroDetailApi = async (id?: string): Promise<any> => {
  const response = (await GET(`api-svc/system-intro/${id}`)) as any;
  return response;
};

export const updateSystemIntroDetailApi = async (params?: InfoFooter): Promise<any> => {
  const response = (await POST(
    `api-svc/
/system-intro/update-footer`,
    params,
  )) as any;
  return response;
};
