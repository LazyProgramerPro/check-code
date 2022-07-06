import {ApiDeploymentDataAction, DeployGatewayParam, GatewayInfoEntity} from "../models";
import {ADD_CURRENT_GATEWAY, DEPLOY_GATEWAY, INIT_DEPLOYMENT_DATA} from "../constants";

export const initData = (data: GatewayInfoEntity[]) : ApiDeploymentDataAction => {
  return {
    type: INIT_DEPLOYMENT_DATA,
    data: data
  }
}

export const addCurrentGateway = (currGw: GatewayInfoEntity): ApiDeploymentDataAction => {
  return {
    type: ADD_CURRENT_GATEWAY,
    currGw: currGw
  }
}

export const deployGateway = (param: DeployGatewayParam): ApiDeploymentDataAction => {
  return {
    type: DEPLOY_GATEWAY,
    deployParam: param
  }
}
