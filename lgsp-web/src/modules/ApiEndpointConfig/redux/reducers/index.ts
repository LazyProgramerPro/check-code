import {
  CheckApiEndpointConfigurationState,
  GetApiEndpointConfigurationState,
  ShowConfigurationFormState,
  UpdateApiEndpointConfigurationState,
  UpdateEndpointListState,
} from '../models';
import { combineReducers } from 'redux';
import getState from './get_endpoint_configuration';
import updateState from './update_endpoint_configuration';
import showState from './show_configuration_form';
import updateEndpointListState from './update_endpoint_list';
import checkEndpointState from './check_endpoint';
export interface ApiEndpointConfigurationModuleState {
  getState: GetApiEndpointConfigurationState;
  updateState: UpdateApiEndpointConfigurationState;
  showState: ShowConfigurationFormState;
  updateEndpointListState: UpdateEndpointListState;
  checkEndpointState: CheckApiEndpointConfigurationState;
}

export default combineReducers<ApiEndpointConfigurationModuleState>({
  getState: getState,
  updateState: updateState,
  showState: showState,
  updateEndpointListState: updateEndpointListState,
  checkEndpointState: checkEndpointState,
});
