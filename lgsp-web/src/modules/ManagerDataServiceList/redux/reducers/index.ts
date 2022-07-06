import { combineReducers } from 'redux';
import { DeleteDataServiceState, GetListDataServiceState } from '../models';
import { deleteReducers } from './delete_dataService';
import { getReducers } from './get_dataService';

export interface ListDataServicesModulesState {
  getState: GetListDataServiceState;
  deleteState: DeleteDataServiceState;
}

export default combineReducers<ListDataServicesModulesState>({
  getState: getReducers,
  deleteState: deleteReducers,
});
