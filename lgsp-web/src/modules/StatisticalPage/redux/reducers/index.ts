import { combineReducers } from 'redux';
import {
  DataStatiscalState,
  GetAccountState,
  GetApiState,
  GetDataServiceState,
  GetDataState,
  GetIdState,
  GetLogUserState,
} from '../models';
import { getAccountState } from './get_account';
import { getLogConnectionState } from './get_connection';
import { getData } from './get_data';
import { getIdState } from './get_id';
import { getLogApiState } from './get_log_api';
import { getLogDataServiceState } from './get_log_data_service';
import { getLogUserState } from './get_log_user';
export interface StatisticalPageModuleState {
  getLogUserState: GetLogUserState;
  getLogDataServiceState: GetDataServiceState;
  getLogApiState: GetApiState;
  getLogConnectionState: GetDataState;
  getData: DataStatiscalState;
  getAccountState: GetAccountState;
  getIdState: GetIdState;
}

export default combineReducers<StatisticalPageModuleState>({
  getLogUserState: getLogUserState,
  getLogDataServiceState: getLogDataServiceState,
  getLogApiState: getLogApiState,
  getLogConnectionState: getLogConnectionState,
  getData: getData,
  getAccountState: getAccountState,
  getIdState: getIdState,
});
