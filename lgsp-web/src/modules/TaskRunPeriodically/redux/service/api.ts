import { GET, POST } from 'src/services';
import { GetListTaskParams, TaskParams } from '../models';

export const getListTaskApi = async (params?: GetListTaskParams): Promise<any> => {
  const response = (await GET('core-svc/schedule-task/search', params)) as any;
  return response;
};

export const getListDataServiceApi = async (params?: any): Promise<any> => {
  const response = (await GET('core-svc/data-service/search', params)) as any;
  return response;
};

export const getListOperationApi = async (id?: string): Promise<any> => {
  const response = (await GET(`core-svc/data-service/${id}/operation`)) as any;
  return response;
};

export const createTaskApi = async (params?: TaskParams): Promise<any> => {
  const response = (await POST(`core-svc/schedule-task/create`, params)) as any;
  return response;
};

export const updateTaskApi = async (params?: TaskParams): Promise<any> => {
  const response = (await POST(`core-svc/schedule-task/update`, params)) as any;
  return response;
};

export const deleteTaskApi = async (id?: string): Promise<any> => {
  const param = {
    id: id,
  };
  const response = (await POST(`core-svc/schedule-task/delete`, param)) as any;
  return response;
};

export const checkExistName = async (name?: string): Promise<any> => {
  const response = (await GET(`core-svc/schedule-task/check-exist-name?name=${name}`)) as any;
  return response;
};
