import { combineReducers } from 'redux';
import { CreateResourceState, DeleteResourceState, GetResourceState, UpdateResourceState } from '../models';
import { getResourceState } from './get_resource';
import { createState } from './create_resource';
import { deleteState } from './delete_resource';
import updateState from './update_resource';

export interface ResourceModuleState {
  getResourceState: GetResourceState;
  createState: CreateResourceState;
  deleteState: DeleteResourceState;
  updateState: UpdateResourceState;
}

export default combineReducers<ResourceModuleState>({
  getResourceState: getResourceState,
  createState: createState,
  deleteState: deleteState,
  updateState: updateState,
});
