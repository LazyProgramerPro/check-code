import {IGroupApiState, GetRestApiState} from "../models";
import getState from './get_rest_api'
import getGroupState from './get_group_rest_api'
import {combineReducers} from "redux";

export interface RestApiModuleState{
  getState:GetRestApiState
  getGroupState: IGroupApiState,
}

export default combineReducers<RestApiModuleState>({
  getState: getState,
  getGroupState: getGroupState
})
