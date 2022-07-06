import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getDocumentSuccess, getDocumentErrors } from '../actions/get_documents';
import { documentData } from '../service/apis';

export function* getDocumentAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield documentData(action.params);
    yield put(getDocumentSuccess(datas));
  } catch (error) {
    yield put(getDocumentErrors(error));
  }
}
