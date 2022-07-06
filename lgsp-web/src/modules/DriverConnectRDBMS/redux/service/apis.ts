import { ListResponseBase } from '../../../../models/baseResponse';
import { GET, POST, POSTIMAGE, DELETE, EXPORT, EXPORT3 } from '../../../../services';
import {
  CreateDriverParams,
  DeleteDriverParam,
  DownloadDriverParam,
  GetDriverParams,
  UpdateDriverParam,
} from '../models';
import { NotificationError } from '../../../../components/Notification/Notification';

export const driver = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('api-svc/driver-manager/', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const createDriver = (params?: CreateDriverParams): Promise<any> => {
  let data = new FormData();
  data.append('file', params?.file);
  data.append('name', params?.name || '');
  data.append('type', String(params?.type) || '');
  data.append('version', params?.version || '');
  return POSTIMAGE('api-svc/driver-manager/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteDriver = (param: DeleteDriverParam | undefined): Promise<any> => {
  return DELETE(`api-svc/driver-manager?id=${param?.id}`);
};

export const updateDriver = (params?: UpdateDriverParam): Promise<any> => {
  let data = new FormData();
  data.append('file', params?.file);
  data.append('id', params?.id || '');
  data.append('type', String(params?.type) || '');
  data.append('version', params?.version || '');
  data.append('name', params?.name || '');
  return POSTIMAGE('api-svc/driver-manager/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const downloadDriver2 = async (param: DownloadDriverParam, turnOffLoading: Function): Promise<{}> => {
  const response = (await EXPORT(`api-svc/driver-manager/download/`, param)) as any;
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  document.body.appendChild(link);
  const filename: string = param.name + '-' + param.version + '.jar';
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  turnOffLoading();
  return { data: response };
};

export const dowloadDriver = async (params?: GetDriverParams, name?: string): Promise<{}> => {
  const response = (await EXPORT(`api-svc/driver-manager/download/${params}`)) as any;
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  document.body.appendChild(link);
  const filename: string = name + '.jar';
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  return { data: response };
};

export const dowloadAll = async (params: any, turnOffLoading: Function): Promise<{}> => {
  const response = (await EXPORT3('api-svc/driver-manager/download-all', params)) as any;
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  document.body.appendChild(link);
  const filename: string = 'driver.zip';
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  turnOffLoading();
  return { data: response };
};

export const validateNameCreate = async (name?: string, version?: string): Promise<any> => {
  const response = (await GET(`api-svc/driver-manager/check-exist?name=${name}&version=${version}`)) as any;
  return response;
};
