import {put} from 'redux-saga/effects';
import * as apis from '../../services/apis';
import {listAttendanceByMonthError, listAttendanceByMonthSuccess} from '../actions';
import {ActionBase} from 'src/models/common';

export function* getListAttendanceByMonthAsync(action: ActionBase<{}>) {
  try {
    const listData = yield apis.getListAttendanceByMonth(action.params);
    yield put(listAttendanceByMonthSuccess(listData));
  } catch (error) {
    yield put(listAttendanceByMonthError(error));
  }
}
