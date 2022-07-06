import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getCategoryErrors } from 'src/modules/DataPublic/redux/action/get_category';
import { getAccountSuccess } from '../actions/get_account';
import { getAccount } from '../services/apis';

export function* getAccountAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield getAccount(action.params);
    yield put(getAccountSuccess(datas));
  } catch (error) {
    yield put(getCategoryErrors(error));
  }
}
