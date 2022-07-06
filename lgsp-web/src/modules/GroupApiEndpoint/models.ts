import { EEndpointType } from "src/models/common";


export enum EEnvironmentType {
  PROD = 'PRODUCTION',
  TEST = 'TESTING'
}
export enum ESecurityType{
  NONE= 'none',
  CLIENT_CREDENTIAL= 'clientCredential',
  PASSWORD = 'password'
}

export enum ELoadBalancerAlgorithm{
  ROUND_ROBIN = 'roundRobin',
  WEIGHTED_ROUND_ROBIN = 'weightedRoundRobin'
}

export enum ELoadBalancerSession{
  NONE= 'none',
  CLIENT_ID = 'clientId',
  HTTP_COOKIE = 'httpCookie'
}

export interface ILoadBalancerConfig {
  algorithm: string,
  sessionManagement: string,
  sessionTimeout: string
}

export interface IProductionEndpoint {
  templateNotSupported: boolean,
  url: string
}

export interface ISandboxEndpoint {
  templateNotSupported: boolean,
  url: string
}

export interface IProductionSecurity {
  clientId: string,
  clientSecret: string,
  grantType: string,
  password: string,
  tokenUrl: string,
  username: string
}

export interface ISandboxSecurity {
  clientId: string,
  clientSecret: string,
  grantType: string,
  password: string,
  tokenUrl: string,
  username: string
}

export interface IGroupApiEndpointObject {
  enableFailOver: boolean,
  endpointType: EEndpointType,
  lastUpdate: string,
  loadBalancerConfiguration: Partial<ILoadBalancerConfig>,
  productionEndpoints: IProductionEndpoint[],
  productionSecurity: Partial<IProductionSecurity>,
  sandboxEndpoints: ISandboxEndpoint[],
  sandboxSecurity: Partial<ISandboxSecurity>
}
