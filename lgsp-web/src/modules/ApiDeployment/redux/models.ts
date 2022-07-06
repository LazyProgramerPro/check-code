import {AppError} from "../../../models/baseResponse";

export interface GatewayInfoEntity{
  id?: string,
  name: string,
  displayName: string,
  description?: string,
  hostList?: GatewayHostEntity[],
  current?: boolean,
  currentVhost?: string,
  httpUrl?: string,
  httpsUrl?: string,
}

export interface GatewayHostEntity{
  host: string,
  context?: string,
  httpPort: number,
  httpsPort: number,
  urlServer: string,
}

export interface DeployGatewayParam{
  apiId: string,
  gatewayName: string,
  vhost: string,
  description: string,
}

export interface ApiDeploymentDataAction{
  type?: string,
  data?: GatewayInfoEntity[],
  currGw?: GatewayInfoEntity,
  deployParam?: DeployGatewayParam,
  error?: AppError
}

export interface ApiDeploymentDataState{
  loading?: boolean
  data?: GatewayInfoEntity[],
  deployParam?: DeployGatewayParam,
  error?: AppError
}
