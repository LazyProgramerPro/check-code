import {GetQueryDetailState, GetQueryState} from "../models";
import getState from "../reducers/get_query"
import getDetailState from "../reducers/get_query_detail"
import {combineReducers} from "redux";

export interface QueryModuleState{
  getState: GetQueryState,
  getDetailState: GetQueryDetailState,
}

export default combineReducers<QueryModuleState>({
  getState: getState,
  getDetailState: getDetailState
})
