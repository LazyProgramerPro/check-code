import { ListResponseBase } from 'src/models/baseResponse';
import { EXPORT, GET, POST } from 'src/services';
import { CreateGatewayParams, DeleteGatewayParam, UpdateGatewayParam } from '../models';

export const dataGateway = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/api-gateway/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const deleteGateway = (param: DeleteGatewayParam | undefined): Promise<any> => {
  return POST('core-svc/api-gateway/delete', param);
};

export const createGateway = (params?: CreateGatewayParams): Promise<any> => {
  return POST('core-svc/api-gateway/create', params);
};

export const updateGateway = (params?: UpdateGatewayParam): Promise<any> => {
  return POST('core-svc/api-gateway/update', params);
};

//Export Gateway
export const exportGateway = async (params?: any): Promise<{}> => {
  const response = (await EXPORT('core-svc/api-gateway/export', params)) as any;
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  document.body.appendChild(link);
  const filename: string = 'GatewayList.xlsx';
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  return { data: response };
};

export const importGateway = async (params?: any): Promise<any> => {
  let formData = new FormData();
  formData.append('file ', params.file);
  try {
    const response = (await POST(`core-svc/api-gateway/import`, formData)) as any;
    return {
      code: response.code,
      message: response.message,
    };
  } catch (error) {
    return error as any;
  }
};

export const validateNameCreate = async (name?: string): Promise<any> => {
  const response = (await GET(`core-svc/api-gateway/check-exist-name?name=${name}`)) as any;
  return response;
};

//downloadTemplate
export const downloadTemplate = async (params?: any): Promise<{}> => {
  const response = (await EXPORT('core-svc/api-gateway/template', params)) as any;
  // console.log('response : ' + JSON.stringify(response));
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  document.body.appendChild(link);
  const filename: string = 'Gateway_Template.xlsx';
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  return { data: response };
};
