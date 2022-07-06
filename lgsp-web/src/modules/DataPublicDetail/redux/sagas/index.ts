import { all, takeLatest } from '@redux-saga/core/effects';
import {
  GET_DOCUMENT,
  GET_INFORMATION,
  GET_PRODUCTION,
  GET_SANDBOX,
  GET_TEST,
  GET_TOKEN,
  SUB_REGISTER,
  SUB_UNREGISTER,
  UPDATE_PRODUCTION,
  UPDATE_TEST,
} from '../constanst';
import { getDocumentAsyns } from './get_documents';
import { getInformationAsyns } from './get_information';
import { getProductionAsyns } from './get_production';
import { getRegisterAsync } from './get_register';
import { getSandboxAsyns } from './get_sandbox';
import { getTestAsyns } from './get_test';
import { getTokenAsyns } from './get_token';
import { getUnRegisterAsync } from './get_unregister';
import { updateProductionAsync } from './update_production';
import { updateTestAsync } from './update_test';

export default function* root() {
  return all([
    yield takeLatest(GET_INFORMATION, getInformationAsyns),
    yield takeLatest(GET_DOCUMENT, getDocumentAsyns),
    yield takeLatest(GET_PRODUCTION, getProductionAsyns),
    yield takeLatest(GET_TEST, getTestAsyns),
    yield takeLatest(GET_TOKEN, getTokenAsyns),
    yield takeLatest(GET_SANDBOX, getSandboxAsyns),
    yield takeLatest(SUB_REGISTER, getRegisterAsync),
    yield takeLatest(SUB_UNREGISTER, getUnRegisterAsync),
    yield takeLatest(UPDATE_PRODUCTION, updateProductionAsync),
    yield takeLatest(UPDATE_TEST, updateTestAsync),
  ]);
}
