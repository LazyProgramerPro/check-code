import { combineReducers } from 'redux';
import {getGeneralState} from './get_datageneral';
import {DataGeneralState} from '../models';
export interface DataGeneralModuleState {
  getGeneralState: DataGeneralState;
}
export default combineReducers<DataGeneralModuleState>({
  getGeneralState: getGeneralState,
});
