import {put} from 'redux-saga/effects';
import * as apis from '../../services/apis';
import {listTimesheetByMonthError, listTimesheetByMonthSuccess} from '../actions';
import {ActionBase} from 'src/models/common';

export function* getListTimesheetByMonthAsync(action: ActionBase<{}>) {
  try {
    const timesheetData = yield apis.getListTimesheetByMonth(action.params);
    yield put(listTimesheetByMonthSuccess(timesheetData));
  } catch (error) {
    yield put(listTimesheetByMonthError(error));
  }
}
