import {ApiRuntimeConfigurationDataState, UpdateApiRuntimeConfigurationState} from "../models";
import {combineReducers} from "redux";
import dataState from './runtime_configuration_data'
import updateState from './update_runtime_configuration'

export interface ApiRuntimeConfigurationModuleState{
  dataState: ApiRuntimeConfigurationDataState,
  updateState: UpdateApiRuntimeConfigurationState
}

export default combineReducers<ApiRuntimeConfigurationModuleState>({
  dataState: dataState,
  updateState: updateState
});
