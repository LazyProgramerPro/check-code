import dataState from './api_deployment_data'
import {ApiDeploymentDataState} from "../models";
import {combineReducers} from "redux";


export interface ApiDeploymentModuleState{
  dataState: ApiDeploymentDataState,
}

export default combineReducers<ApiDeploymentModuleState>({
  dataState: dataState
})
