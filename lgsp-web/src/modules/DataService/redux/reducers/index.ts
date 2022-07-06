import { combineReducers } from 'redux';
import { ApproveState, GetDataServiceState, GetSingleDataServiceState, RejectState } from '../models';
import { getState } from './get_data_services';
import getSingleState from './get_single_data_service';
import { getStatusState } from './get_status_data_service';
import getStatusReject from './get_status_reject';
export interface DataServiceModuleState {
  getState: GetDataServiceState;
  getSingleState: GetSingleDataServiceState;
  getStatusState: ApproveState;
  getStatusReject: RejectState;
}

export default combineReducers<DataServiceModuleState>({
  getState: getState,
  getSingleState: getSingleState,
  getStatusState: getStatusState,
  getStatusReject: getStatusReject,
});
