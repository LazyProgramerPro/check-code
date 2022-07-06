import {GetDataSourceState, GetSingleDataSourceState} from "../models";
import getState from './get_data_sources'
import getSingleState from './get_single_data_source'
import {combineReducers} from "redux";
import {GetSingleDataServiceState} from "../../../../DataService/redux/models";

export interface DataSourceModuleState{
  getState: GetDataSourceState,
  getSingleState: GetSingleDataSourceState,
}

export default combineReducers<DataSourceModuleState>({
  getState: getState,
  getSingleState: getSingleState,
})
