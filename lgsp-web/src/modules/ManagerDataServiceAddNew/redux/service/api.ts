import { GET, POST, POST_FORM } from 'src/services';
import { ParamsEditXML } from '../../components/FormXMLEditor';
import { CreateDataServiceParams, paramsGenarateInput, paramsGenarateOutput } from '../models';

export const checkingConnection = (params?: any): Promise<any> => {
  return POST(`core-svc/data-source/test-connection`, params);
};

export const createDataService = (params?: CreateDataServiceParams): Promise<any> => {
  if (params?.file?.length === 0) {
    console.log('create', params);
    return POST('core-svc/data-service/create', params);
  }

  let formData = new FormData();
  let fs = params?.file || [];
  console.log('total file: ' + fs.length);
  for (let i = 0; i < fs.length; i++) {
    formData.append('file', fs[i]);
  }

  formData.append('name', params?.name || '');
  formData.append('description', params?.description || '');
  formData.append('dataSources', JSON.stringify(params?.dataSources));
  formData.append('queries', JSON.stringify(params?.queries));
  formData.append('resources', JSON.stringify(params?.resources));
  formData.append('operations', JSON.stringify(params?.operations));

  console.log('create-with-file', formData);

  return POST_FORM('core-svc/data-service/create-with-file', formData);
};

export const getDetailDataServiceUpdate = async (id?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/data-service/detail/${id}`)) as any;
    return response.item;
  } catch (error) {
    return error as any;
  }
};

export const updateDataServiceApi = (params?: CreateDataServiceParams): Promise<any> => {
  if (params?.file?.length === 0) {
    console.log('update', params);
    return POST('core-svc/data-service/update', params);
  }

  let formData = new FormData();
  let fs = params?.file || [];
  console.log('total file: ' + fs.length);
  for (let i = 0; i < fs.length; i++) {
    formData.append('file', fs[i]);
  }

  formData.append('id', params?.id || '');
  formData.append('name', params?.name || '');
  formData.append('description', params?.description || '');
  formData.append('dataSources', JSON.stringify(params?.dataSources));
  formData.append('queries', JSON.stringify(params?.queries));
  formData.append('resources', JSON.stringify(params?.resources));
  formData.append('operations', JSON.stringify(params?.operations));

  console.log('update-with-file', formData);

  return POST_FORM('core-svc/data-service/update-with-file', formData);
};

export const getXmlDefinitionApi = async (id?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/data-service/${id}/xml-definition`)) as any;
    return response;
  } catch (error) {
    return error as any;
  }
};

export const postXmlDefinitionApi = async (params: ParamsEditXML): Promise<any> => {
  try {
    const response = (await POST(`core-svc/data-service/xml-definition/edit`, params)) as any;
    return response;
  } catch (error) {
    return error as any;
  }
};

//Genarate input
export const getDataInput = async (params?: paramsGenarateInput): Promise<any> => {
  const response = (await POST(`core-svc/query/generate-input`, params)) as any;
  return response;
};
//Genarate output
export const getDataOutput = async (params?: paramsGenarateOutput): Promise<any> => {
  const response = (await POST(`core-svc/query/generate-output`, params)) as any;
  return response;
};
//ValidateName
export const validateNameCreate = async (name?: string): Promise<any> => {
  const response = (await GET(`core-svc/data-service/check-exist?name=${name}`)) as any;
  return response;
};
