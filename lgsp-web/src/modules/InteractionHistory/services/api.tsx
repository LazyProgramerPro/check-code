import { GET } from 'src/services';
import { ParamGetList } from './models';

export const getUserActionsApi = async (params?: ParamGetList): Promise<any> => {
  const response = (await GET(
    `core-svc/user-action/search?page=${params?.page}&size=${params?.size}&username=${params?.username}`,
  )) as any;
  return response;
};
