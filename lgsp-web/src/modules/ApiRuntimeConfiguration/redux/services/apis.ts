import { GET, POST, POSTIMAGE } from '../../../../services';
import { ListResponseBase } from '../../../../models/baseResponse';
import { DeleteCertificateFileParam, GetDetailCertificateFileParam, UploadCertificateParam } from '../models';

export const getApiRuntimeConfigurationService = async (apiId?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-api-runtime/${apiId}`)) as ListResponseBase<any>;
    return response;
  } catch (error) {
    return error;
  }
};

export const updateApiRuntimeConfigurationService = async (params?: any): Promise<any> => {
  try {
    return POST('core-svc/publisher-api-runtime/update', params);
  } catch (error) {
    return error;
  }
};

export const uploadCertificateFileService = async (param: UploadCertificateParam): Promise<any> => {
  try {
    console.log(JSON.stringify(param));
    let formData = new FormData();
    formData.append('file', param.file);
    formData.append('apiId', param.apiId);
    formData.append('alias', param.alias);
    formData.append('tier', param.tier);
    formData.append('expiredTime', param.expiredDate);
    return POSTIMAGE('core-svc/publisher-api-runtime/certificate-file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    return error;
  }
};

export const deleteCertificateFileService = async (params?: DeleteCertificateFileParam): Promise<any> => {
  try {
    return POST('core-svc/publisher-api-runtime/certificate-file/delete', params);
  } catch (error) {
    return error;
  }
};

export const getCertificateFileService = async (param?: GetDetailCertificateFileParam): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-api-runtime/certificate-file/`, param)) as ListResponseBase<any>;
    return response;
  } catch (error) {
    return error;
  }
};

export const validate = (name: string, id: string): Promise<any> => {
  return GET(`core-svc/publisher-api-runtime/certificate-file/exist?apiId=${id}&name=${name}`);
};
