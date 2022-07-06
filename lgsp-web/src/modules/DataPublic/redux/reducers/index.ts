import { combineReducers } from 'redux';
import { GetCategoryState, GetDataState, GetOrganizationState } from '../models';
import { getCategoryState } from './get_category';
import { getState } from './get_datas';
import { getOrganizationState } from './get_organization';

export interface DataPublicModuleState {
  getState: GetDataState;
  getOrganizationState: GetOrganizationState;
  getCategoryState: GetCategoryState;
}

export default combineReducers<DataPublicModuleState>({
  getState: getState,
  getOrganizationState: getOrganizationState,
  getCategoryState: getCategoryState,
});
