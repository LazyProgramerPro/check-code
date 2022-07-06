import {CreateGroupRestApiState, IGroupApiState} from "../models";
import {combineReducers} from "redux";
import getState from "./group_api"
import createState from "./create_api"

export interface GroupRestApiModuleState{
  getState: IGroupApiState,
  createState: CreateGroupRestApiState
}

export default combineReducers<GroupRestApiModuleState>({
  getState: getState,
  createState: createState
})
