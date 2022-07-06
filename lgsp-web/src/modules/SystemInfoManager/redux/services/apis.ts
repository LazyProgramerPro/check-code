import {
  CreateContentParams,
  DeleteInforParam,
  InforDetailParams,
  ISystemIntroInforAction,
  ISystemIntroInforEntity,
  PublicInforParams,
  UpdateContentParam,
} from '../models';
import { ItemResponseBase, ListResponseBase, ResponseBase } from 'src/models/baseResponse';
import { GET, POST } from '../../../../services';

export const getSystemIntroInforService = async (params?: any): Promise<any> => {
  try {
    const response = (await GET('api-svc/system-intro', params)) as any;
    return response;
  } catch (error) {
    return error;
  }
};

export const createSystemIntroInforService = async (params?: Partial<ISystemIntroInforEntity>): Promise<any> => {
  const response = (await POST('api-svc/system-intro/create-intro', params)) as any;
  return response;
};

export const publishIntroInforService = async (params?: Partial<ISystemIntroInforEntity>): Promise<any> => {
  const response = (await POST('api-svc/system-intro/publish', params)) as any;
  return response;
};

export const updateSliderInforService = async (params?: Partial<ISystemIntroInforEntity>): Promise<any> => {
  const response = (await POST('api-svc/system-intro/update-slide-image', params)) as any;
  return response;
};

export const updateAddressInforService = async (params?: Partial<ISystemIntroInforEntity>): Promise<any> => {
  const response = (await POST('api-svc/system-intro/update-footer', params)) as any;
  return response;
};

export const deleteIntroInforService = async (params?: Partial<ISystemIntroInforEntity>): Promise<any> => {
  const response = (await POST('api-svc/system-intro/delete-intro', params)) as any;
  return response;
};

//GetData
export const systemInfor = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('api-svc/system-intro', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

//Update
export const updateSystemIntroInforService = async (params?: UpdateContentParam): Promise<any> => {
  return POST('api-svc/system-intro/update-intro', params);
};
//Create

export const createContent = (params?: CreateContentParams): Promise<any> => {
  return POST('api-svc/system-intro/create-intro', params);
};

//Delete
export const deleteInfor = (params?: DeleteInforParam | undefined): Promise<any> => {
  return POST('api-svc/system-intro/delete-intro', params);
};

//Detail
export const detailInfor = async (params?: InforDetailParams): Promise<ItemResponseBase<any>> => {
  const response = (await GET(`api-svc/system-intro/${params?.id}`)) as any;
  return {
    code: response.code,
    message: response.message,
    item: response.item,
  };
};

//Public
export const publicInfor = async (params?: PublicInforParams): Promise<any> => {
  // const object = { id: params?.id };
  return POST('api-svc/system-intro/publish', params);
};
