import {all, takeLatest} from 'redux-saga/effects';
import {getStatisticByMonthAsync} from './get-statistic';
import {getListTimesheetByMonthAsync} from './list-timesheet';
import {getListAttendanceByMonthAsync} from './list-attendance';

import {GET_STATISTIC_BY_MONTH, LIST_ATTENDANCE_BY_MONTH, LIST_TIMESHEET_BY_MONTH,} from '../../constant';

export default function* root() {
  return all([
    yield takeLatest(GET_STATISTIC_BY_MONTH, getStatisticByMonthAsync),
    yield takeLatest(LIST_TIMESHEET_BY_MONTH, getListTimesheetByMonthAsync),
    yield takeLatest(LIST_ATTENDANCE_BY_MONTH, getListAttendanceByMonthAsync)
  ]);
}
