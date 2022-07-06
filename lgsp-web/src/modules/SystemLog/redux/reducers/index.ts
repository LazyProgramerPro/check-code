import { combineReducers } from 'redux';
import { GetLogState } from '../models';
import { getState } from './get_log';

export interface LogModuleState {
  getState: GetLogState;
}
export default combineReducers<LogModuleState>({
  getState: getState,
});
