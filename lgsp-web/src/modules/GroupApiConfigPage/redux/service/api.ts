import { GET, POST } from 'src/services';
import { ParamsCreateVersion } from '../models';

export const getApiDefinitionService = async (apiId?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-apis/${apiId}/definition`)) as any;
    return response;
  } catch (error) {
    return error as any;
  }
};

export const importApiDefinition = async (params?: any): Promise<any> => {
  let formData = new FormData();
  formData.append('file ', params.file);
  try {
    const response = (await POST(`core-svc/publisher-apis/${params.apiId}/import-definition`, formData)) as any;
    return response;
  } catch (error) {
    return error as any;
  }
};

export const editApiDefinition = async (params?: any): Promise<any> => {
  try {
    const response = (await POST(`core-svc/publisher-apis/edit-definition`, params)) as any;
    return response;
  } catch (error) {
    return error as any;
  }
};

export const createVersion = (params?: ParamsCreateVersion): Promise<any> => {
  return POST('core-svc/publisher-apis/new-version', params);
};

export const validateNameVersion = (id: string, version: string): Promise<any> => {
  return GET(`core-svc/publisher-apis/check-exist-version?id=${id}&version=${version}`);
};
