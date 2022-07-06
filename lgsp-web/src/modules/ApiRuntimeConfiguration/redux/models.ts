import { AppError } from '../../../models/baseResponse';

export interface MaxTpsEntity {
  production: number;
  sandbox: number;
}

export interface CertificateFileEntity {
  alias: string;
  tier: string;
}

export interface UploadCertificateParam {
  apiId: string;
  alias: string;
  tier: string;
  file: any;
  expiredDate: string;
}

export interface UpdateApiRuntimeConfigurationParam {
  apiId: string;
  transports: string[];
  enabledSsl: boolean;
  enabledCaching: boolean;
  cacheTimeout: number;
  throughputType: string;
  maxTps?: MaxTpsEntity;
}

export interface UpdateApiRuntimeConfigurationAction {
  type: string;
  params?: UpdateApiRuntimeConfigurationParam;
  error?: AppError;
}

export interface UpdateApiRuntimeConfigurationState {
  loading: boolean;
  params?: UpdateApiRuntimeConfigurationParam;
  error?: AppError;
}

export interface ApiRuntimeConfigurationDataEntity {
  transports: string[];
  enabledSsl: boolean;
  enabledCaching: boolean;
  cacheTimeout: number;
  throughputType?: string;
  maxTps?: MaxTpsEntity;
  certificateList: CertificateFileEntity[];
}

export interface ApiRuntimeConfigurationDataAction {
  type: string;
  showCertDetail?: boolean;
  showAddCert?: boolean;
  transportType?: string[];
  throughputType?: string;
  throughputValue?: number;
  cachingValue?: number;
  certFile?: CertificateFileEntity;
  data?: ApiRuntimeConfigurationDataEntity;
  error?: AppError;
}

export interface ApiRuntimeConfigurationDataState {
  loading: boolean;
  showCertDetail?: boolean;
  showAddCert?: boolean;
  certDetail?: CertificateFileEntity;
  data: ApiRuntimeConfigurationDataEntity;
  error?: AppError;
  flag_reload?: boolean;
}

export interface GetDetailCertificateFileParam {
  apiId: string;
  filename: string;
}

export interface DeleteCertificateFileParam {
  apiId: string;
  filename: string;
}
