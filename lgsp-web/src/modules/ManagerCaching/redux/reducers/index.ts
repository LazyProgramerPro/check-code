import { CreateCachingState, GetCachingState } from '../models';
import { combineReducers } from 'redux';
import { getState } from './get_caching';
import { createState } from './create_caching';
export interface CachingModuleState {
  getState: GetCachingState;
  createState: CreateCachingState;
}
export default combineReducers<CachingModuleState>({
  getState: getState,
  createState: createState,
});
