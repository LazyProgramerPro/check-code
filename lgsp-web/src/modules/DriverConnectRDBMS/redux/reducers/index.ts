import { combineReducers } from 'redux';
import { CreateDriverState, DeleteDriverState, GetDriverState, UpDateDriverState } from '../models';
import { getDriverState } from './get_driver';
import { createState } from './create_driver';
import { deleteState } from './delete_driver';
import updateState from './update_driver';
export interface DriverModuleState {
  getDriverState: GetDriverState;
  createState: CreateDriverState;
  deleteState: DeleteDriverState;
  updateState: UpDateDriverState;
}

export default combineReducers<DriverModuleState>({
  getDriverState: getDriverState,
  createState: createState,
  deleteState: deleteState,
  updateState: updateState,
});
