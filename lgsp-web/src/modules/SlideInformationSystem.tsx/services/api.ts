import { GET, POST } from 'src/services';
import { ParamUpload } from './models';

export const getSystemIntroDetailApi = async (id?: string): Promise<any> => {
  const response = (await GET(`api-svc/system-intro/${id}`)) as any;
  return response;
};

export const updateSlideImageApi = async (params?: ParamUpload): Promise<any> => {
  const response = (await POST(`api-svc/system-intro/update-slide-image`, params)) as any;
  return response;
};
