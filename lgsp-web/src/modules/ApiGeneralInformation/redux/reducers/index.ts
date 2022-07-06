import {GetApiGeneralInformationState, UpdateApiGeneralInformationState} from "../models";
import {combineReducers} from "redux";
import getState from './get_api_general_information'
import updateState from './update_general_information'

export interface ApiGeneralInformationModuleState{
  getState: GetApiGeneralInformationState,
  updateState: UpdateApiGeneralInformationState
}

export default combineReducers<ApiGeneralInformationModuleState>({
  getState: getState,
  updateState: updateState
})
