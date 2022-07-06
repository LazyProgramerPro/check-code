import { combineReducers } from 'redux';
import {DataDetailState, GetDataState} from '../models'
import { detailState } from './detail_data';
import {getState} from './get_data'
export interface DataLDAPModuleState {
  getState: GetDataState,
  detailState: DataDetailState
}

export default combineReducers<DataLDAPModuleState>({
  getState: getState,
  detailState: detailState
})
