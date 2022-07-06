import {GET, POST} from 'src/services';

export const getDetailDataService = async (id?: string): Promise<any> => {
  try {
    return (await GET(`core-svc/data-service/detail/${id}`)) as any;
  } catch (error) {
    return error as any;
  }
};

export const changeDataServiceStatus = async (id?: string): Promise<any> => {
  try {
    return  POST(`core-svc/data-service/${id}/change-status`, null);
  } catch (error) {
    return error as any;
  }
}
