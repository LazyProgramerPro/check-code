import { AppError, ItemResponseBase } from '../../../models/baseResponse';
import { EEnvironmentType } from '../../GroupApiEndpoint/models';
import { EEndpointType } from '../../../models/common';

export interface EndpointConfigurationEntity {
  apiType: string;
  endpointType: string;
  sandboxEndpoints: EndpointEntity[];
  productionEndpoints: EndpointEntity[];
  sandboxSecurity: OAuthConfigurationEntity;
  productionSecurity: OAuthConfigurationEntity;
  loadBalancerConfiguration: LoadBalancerConfigurationEntity;
  lastUpdate?: string;
}

export interface EndpointEntity {
  url: string;
}

export interface ApiEndpointConfigurationData {
  apiType?: string;
  endpointType?: string;
  sandboxEndpoints: EndpointEntity[];
  productionEndpoints: EndpointEntity[];
  sandboxSecurity?: OAuthConfigurationEntity;
  productionSecurity?: OAuthConfigurationEntity;
  loadBalancerConfiguration?: LoadBalancerConfigurationEntity;
  productionActive?: boolean;
  sandboxActive?: boolean;
}

export interface OAuthConfigurationEntity {
  grantType: string;
  tokenUrl?: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
}

export interface LoadBalancerConfigurationEntity {
  algorithm: string;
  sessionManagement: string;
  sessionTimeout: number;
}

export interface GetApiEndpointConfigurationAction {
  type: string;
  apiId?: string;
  payload?: ItemResponseBase<EndpointConfigurationEntity>;
  error?: AppError;
}

export interface GetApiEndpointConfigurationState {
  loading: boolean;
  apiId?: string;
  error?: AppError;
  item?: EndpointConfigurationEntity;
  flag_reload: boolean;
}

export interface UpdateApiEndpointConfigurationParam {
  apiId: string;
  apiType?: string;
  endpointType?: string;
  sandboxEndpoints: EndpointEntity[];
  productionEndpoints: EndpointEntity[];
  sandboxSecurity?: OAuthConfigurationEntity;
  productionSecurity?: OAuthConfigurationEntity;
  loadBalancerConfiguration?: LoadBalancerConfigurationEntity;
  productionActive?: boolean;
  sandboxActive?: boolean;
}
export interface UpdateApiEndpointConfigurationAction {
  type: string;
  apiType?: string;
  endpointType?: string;
  endpointUrl?: string;
  endpointActive?: boolean;
  securityConfig?: OAuthConfigurationEntity;
  loadBalancerConfig?: LoadBalancerConfigurationEntity;
  params?: UpdateApiEndpointConfigurationParam;
  data?: ApiEndpointConfigurationData;
  error?: AppError;
}

export interface UpdateApiEndpointConfigurationState {
  loading: boolean;
  checkClick?: boolean;
  data?: ApiEndpointConfigurationData;
  params?: UpdateApiEndpointConfigurationParam;
  error?: AppError;
}

export interface ShowConfigurationFormAction {
  type: string;
  securityShow?: boolean;
  loadBalanceShow?: boolean;
  endpointType?: EEnvironmentType;
  securityData?: OAuthConfigurationEntity;
  loadBalanceData?: LoadBalancerConfigurationEntity;
}

export interface ShowConfigurationFormState {
  productionSecurityShow?: boolean;
  sandboxSecurityShow?: boolean;
  loadBalanceShow?: boolean;
  endpointType?: EEnvironmentType;
  securityData?: OAuthConfigurationEntity;
  loadBalanceData?: LoadBalancerConfigurationEntity;
}

export interface UpdateEndpointListParam {
  type: EEndpointType;
  productionList: string[];
  sandboxList: string[];
}

export interface UpdateEndpointListAction {
  param?: UpdateEndpointListParam;
  type: string;
  endpoint?: string;
  index?: number;
}

export interface UpdateEndpointListState {
  params: UpdateEndpointListParam;
}

//////////////////CheckEndPoint///////////////////

export interface CheckEndpointConfigurationEntity {
  apiType: string;
  endpointType: string;
  sandboxEndpoints: CheckEndpointEntity[];
  productionEndpoints: CheckEndpointEntity[];
  sandboxSecurity: AuthConfigurationEntity;
  productionSecurity: AuthConfigurationEntity;
  loadBalancerConfiguration: CheckLoadBalancerConfigurationEntity;
  lastUpdate?: string;
}

export interface CheckEndpointEntity {
  templateNotSupported: true;
  url: string;
}

export interface CheckApiEndpointConfigurationData {
  apiType?: string;
  endpointType?: string;
  sandboxEndpoints: CheckEndpointEntity[];
  productionEndpoints: CheckEndpointEntity[];
  sandboxSecurity?: AuthConfigurationEntity;
  productionSecurity?: AuthConfigurationEntity;
  loadBalancerConfiguration?: CheckLoadBalancerConfigurationEntity;
  productionActive?: boolean;
  sandboxActive?: boolean;
}

export interface AuthConfigurationEntity {
  grantType: string;
  tokenUrl?: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
}

export interface CheckLoadBalancerConfigurationEntity {
  algorithm: string;
  sessionManagement: string;
  sessionTimeout: number;
}

export interface GetCheckApiEndpointConfigurationAction {
  type: string;
  apiId?: string;
  payload?: ItemResponseBase<CheckEndpointConfigurationEntity>;
  error?: AppError;
}

export interface GetCheckApiEndpointConfigurationState {
  loading: boolean;
  apiId?: string;
  error?: AppError;
  item?: CheckEndpointConfigurationEntity;
  flag_reload: boolean;
}

export interface CheckApiEndpointConfigurationParam {
  apiId: string;
  apiType?: string;
  endpointType?: string;
  sandboxEndpoints: CheckEndpointEntity[];
  productionEndpoints: CheckEndpointEntity[];
  sandboxSecurity?: AuthConfigurationEntity;
  productionSecurity?: AuthConfigurationEntity;
  loadBalancerConfiguration?: CheckLoadBalancerConfigurationEntity;
  productionActive?: boolean;
  sandboxActive?: boolean;
}
export interface CheckApiEndpointConfigurationAction {
  type: string;
  apiType?: string;
  endpointType?: string;
  endpointUrl?: string;
  endpointActive?: boolean;
  securityConfig?: AuthConfigurationEntity;
  loadBalancerConfig?: CheckLoadBalancerConfigurationEntity;
  params?: CheckApiEndpointConfigurationParam;
  data?: CheckApiEndpointConfigurationData;
  error?: AppError;
}

export interface CheckApiEndpointConfigurationState {
  loading: boolean;
  data?: CheckApiEndpointConfigurationData;
  params?: CheckApiEndpointConfigurationParam;
  error?: AppError;
}

export interface ShowCheckConfigurationFormAction {
  type: string;
  securityShow?: boolean;
  loadBalanceShow?: boolean;
  endpointType?: EEnvironmentType;
  securityData?: AuthConfigurationEntity;
  loadBalanceData?: CheckLoadBalancerConfigurationEntity;
}

export interface ShowCheckConfigurationFormState {
  productionSecurityShow?: boolean;
  sandboxSecurityShow?: boolean;
  loadBalanceShow?: boolean;
  endpointType?: EEnvironmentType;
  securityData?: AuthConfigurationEntity;
  loadBalanceData?: CheckLoadBalancerConfigurationEntity;
}

export interface CheckEndpointListParam {
  type: EEndpointType;
  productionList: string[];
  sandboxList: string[];
}

export interface CheckEndpointListAction {
  param?: CheckEndpointListParam;
  type: string;
  endpoint?: string;
  index?: number;
}

export interface CheckEndpointListState {
  params: CheckEndpointListParam;
}
