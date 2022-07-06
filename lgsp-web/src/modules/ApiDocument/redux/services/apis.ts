import { ListResponseBase } from '../../../../models/baseResponse';
import { ApiDocumentEntity, CreateApiDocumentParam, DeleteApiDocumentParam, UpdateApiDocumentParam } from '../models';
import { EXPORT, GET, POST, POSTIMAGE } from '../../../../services';
import axios from 'axios';
import env from '../../../../configs/env';

export const searchApiDocumentService = async (params?: any): Promise<ListResponseBase<ApiDocumentEntity>> => {
  const response = (await GET('core-svc/publisher-api-document/search', params)) as ListResponseBase<ApiDocumentEntity>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const createApiDocumentService = (params?: CreateApiDocumentParam): Promise<any> => {
  let formData = new FormData();
  formData.append('file', params?.file);
  formData.append('apiId', params?.apiId || '');
  formData.append('summary', params?.summary || '');
  formData.append('name', params?.name || '');
  return POSTIMAGE('core-svc/publisher-api-document/create-by-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateApiDocumentService = (params?: UpdateApiDocumentParam): Promise<any> => {
  let formData = new FormData();
  formData.append('docId', params?.docId || '');
  formData.append('file', params?.file);
  formData.append('apiId', params?.apiId || '');
  formData.append('summary', params?.summary || '');
  formData.append('name', params?.name || '');
  return POSTIMAGE('core-svc/publisher-api-document/update-by-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteApiDocumentService = (param?: DeleteApiDocumentParam): Promise<any> => {
  return POST('core-svc/publisher-api-document/delete', param);
};

export const downloadApiDocumentService = async (docId: string, filename: string): Promise<{}> => {
  console.log(filename);
  const response = (await EXPORT(`core-svc/publisher-api-document/download?docId=${docId}`)) as any;
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  document.body.appendChild(link);
  console.log('fileName : ' + JSON.stringify(response.headers));
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();

  return response;
};

export const validateNameDocument = (name: string, id: string): Promise<any> => {
  return GET(`core-svc/publisher-api-document/check-exist-name?id=${id}&name=${name}`);
};
