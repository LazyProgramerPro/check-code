import { combineReducers } from 'redux';
import { CreateGatewayState, DeleteGatewayState, GetDataGatewayState, UpdateGatewayState } from '../models';
import { getDataGatewayState } from './get_data_gateway';
import { deleteState } from './delete_gateway';
import { createState } from './create_gateway';
import updateState from './update_gateway';
export interface DataGatewayModuleState {
  getDataGatewayState: GetDataGatewayState;
  deleteState: DeleteGatewayState;
  createState: CreateGatewayState;
  updateState: UpdateGatewayState;
}

export default combineReducers<DataGatewayModuleState>({
  getDataGatewayState: getDataGatewayState,
  deleteState: deleteState,
  createState: createState,
  updateState: updateState,
});
