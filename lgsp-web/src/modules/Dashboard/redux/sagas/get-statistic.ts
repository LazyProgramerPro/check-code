import {put} from 'redux-saga/effects';
import * as apis from '../../services/apis';
import {getStatisticByMonthError, getStatisticByMonthSuccess} from '../actions';
import {ActionBase} from 'src/models/common';

export function* getStatisticByMonthAsync(action: ActionBase<{}>) {
  try {
    const listData = yield apis.getStatisticByMonth(action.params);
    yield put(getStatisticByMonthSuccess(listData));
  } catch (error) {
    yield put(getStatisticByMonthError(error));
  }
}
