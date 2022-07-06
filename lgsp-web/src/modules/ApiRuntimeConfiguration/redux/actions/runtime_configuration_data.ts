import { ApiRuntimeConfigurationDataAction, ApiRuntimeConfigurationDataEntity, CertificateFileEntity } from '../models';
import {
  ADD_FILE_CERTIFICATE_TO_LIST,
  API_RUNTIME_CONFIGURATION_CHANGE_CACHING_VALUE,
  API_RUNTIME_CONFIGURATION_CHANGE_PRODUCTION_THROUGHPUT_VALUE,
  API_RUNTIME_CONFIGURATION_CHANGE_SANDBOX_THROUGHPUT_VALUE,
  API_RUNTIME_CONFIGURATION_CHANGE_THROUGHPUT_TYPE,
  API_RUNTIME_CONFIGURATION_CHANGE_TRANSPORT_TYPE,
  API_RUNTIME_CONFIGURATION_DATA_INIT,
  API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_CACHING,
  DELETE_FILE_CERTIFICATE_FROM_LIST,
  SHOW_CERTIFICATE_FILE_INFORMATION,
  SHOW_ADD_CERTIFICATE_FILE_FORM,
  API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_SSL,
  RELOAD_API,
} from '../constants';

export const initDataRuntimeConfiguration = (
  data: ApiRuntimeConfigurationDataEntity,
): ApiRuntimeConfigurationDataAction => {
  return {
    type: API_RUNTIME_CONFIGURATION_DATA_INIT,
    data: data,
  };
};

export const changeTransportType = (transportType: string[]) => {
  return {
    type: API_RUNTIME_CONFIGURATION_CHANGE_TRANSPORT_TYPE,
    transportType: transportType,
  };
};

export const changeEnableSsl = () => {
  return {
    type: API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_SSL,
  };
};

export const addFileCertificateToList = (certFile: CertificateFileEntity): ApiRuntimeConfigurationDataAction => {
  return {
    type: ADD_FILE_CERTIFICATE_TO_LIST,
    certFile: certFile,
  };
};

export const removeFileCertificateFromList = (certFile: CertificateFileEntity): ApiRuntimeConfigurationDataAction => {
  return {
    type: DELETE_FILE_CERTIFICATE_FROM_LIST,
    certFile: certFile,
  };
};

export const changeCachingValue = (cachingValue: number): ApiRuntimeConfigurationDataAction => {
  return {
    type: API_RUNTIME_CONFIGURATION_CHANGE_CACHING_VALUE,
    cachingValue: cachingValue,
  };
};

export const changeEnableCaching = (): ApiRuntimeConfigurationDataAction => {
  return {
    type: API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_CACHING,
  };
};

export const changeThroughputType = (throughputType: string): ApiRuntimeConfigurationDataAction => {
  return {
    type: API_RUNTIME_CONFIGURATION_CHANGE_THROUGHPUT_TYPE,
    throughputType: throughputType,
  };
};

export const changeThroughputProductionValue = (throughputValue: number): ApiRuntimeConfigurationDataAction => {
  return {
    type: API_RUNTIME_CONFIGURATION_CHANGE_PRODUCTION_THROUGHPUT_VALUE,
    throughputValue: throughputValue,
  };
};

export const changeThroughputSandboxValue = (throughputValue: number): ApiRuntimeConfigurationDataAction => {
  return {
    type: API_RUNTIME_CONFIGURATION_CHANGE_SANDBOX_THROUGHPUT_VALUE,
    throughputValue: throughputValue,
  };
};

export const showCertificateFileInformation = (
  show: boolean,
  certData?: CertificateFileEntity,
): ApiRuntimeConfigurationDataAction => {
  if (certData === undefined) {
    return {
      type: SHOW_CERTIFICATE_FILE_INFORMATION,
      showCertDetail: show,
    };
  } else {
    return {
      type: SHOW_CERTIFICATE_FILE_INFORMATION,
      showCertDetail: show,
      certFile: certData,
    };
  }
};

export const showAddCertificationForm = (show: boolean): ApiRuntimeConfigurationDataAction => {
  return {
    type: SHOW_ADD_CERTIFICATE_FILE_FORM,
    showAddCert: show,
  };
};

export const loadPage = () => {
  return {
    type: RELOAD_API,
  };
};
