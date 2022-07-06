import {ApiResourceDataState, ShowModalState, UpdateApiResourceState} from "../models";
import {combineReducers} from "redux";
import updateState from './update_api_resource';
import dataState from './api_resource_data';
import showState from './show_modal';

export interface ApiResourceModuleState{
  updateState: UpdateApiResourceState,
  dataState: ApiResourceDataState,
  showState: ShowModalState
}

export default combineReducers<ApiResourceModuleState>({
  updateState: updateState,
  dataState: dataState,
  showState: showState
})
