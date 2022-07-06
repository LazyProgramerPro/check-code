import { combineReducers } from 'redux';
import { CreateServiceState, DeleteServiceState, GetServiceState, UpdateServiceState } from '../models';
import { createState } from './create_service';
import { deleteState } from './delete_service';
import { getState } from './get_service';
import updateState from './update_service';
export interface ServicePublicModuleState {
  getState: GetServiceState;
  createState: CreateServiceState;
  deleteState: DeleteServiceState;
  updateState: UpdateServiceState;
}
export default combineReducers<ServicePublicModuleState>({
  getState: getState,
  createState: createState,
  deleteState: deleteState,
  updateState: updateState,
});
