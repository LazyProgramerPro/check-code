import { combineReducers } from 'redux';
import {
  DetailState,
  GetDocumentState,
  GetInformationState,
  GetProductionState,
  GetRegisterState,
  GetSandboxState,
  GetTestState,
  GetTokenState,
  GetUnRegisterState,
  UpdateProductionState,
  UpdateTestState,
} from '../models';
import detail from './detail';
import { getDocumentState } from './get_documents';
import { getInformationState } from './get_information';
import { getProductionState } from './get_production';
import { getStatusState } from './get_register';
import { getSandboxState } from './get_sandbox';
import { getTestState } from './get_test';
import { getTokenState } from './get_token';
import { getSetStatusState } from './get_unregister';
import updateProductionState from './update_production';
import updateTestState from './update_test';
export interface DataPublicDetailModuleState {
  getInformationState: GetInformationState;
  getDocumentState: GetDocumentState;
  getProductionState: GetProductionState;
  getTestState: GetTestState;
  getTokenState: GetTokenState;
  getSandboxState: GetSandboxState;
  getRegisterState: GetRegisterState;
  getUnRegisterState: GetUnRegisterState;
  detailState: DetailState;
  updateProductionState: UpdateProductionState;
  updateTestState: UpdateTestState;
}
export default combineReducers<DataPublicDetailModuleState>({
  getInformationState: getInformationState,
  getDocumentState: getDocumentState,
  getProductionState: getProductionState,
  getTestState: getTestState,
  getTokenState: getTokenState,
  getSandboxState: getSandboxState,
  getRegisterState: getStatusState,
  getUnRegisterState: getSetStatusState,
  detailState: detail,
  updateProductionState: updateProductionState,
  updateTestState: updateTestState,
});
