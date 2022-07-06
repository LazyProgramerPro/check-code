import { GET } from 'src/services';

export const getCategoriesApi = async (): Promise<any> => {
  const response = (await GET(`core-svc/public-api/no-auth/category/getAll`)) as Promise<any>;
  return response;
};

export const getDeploymentUnitApi = async (): Promise<any> => {
  const response = (await GET(`core-svc/public-api/no-auth/deployment-unit/getAll`)) as Promise<any>;
  return response;
};
