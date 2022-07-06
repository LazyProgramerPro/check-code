import {AppError, ListResponseBase} from 'src/models/common';
import {Timesheet} from 'src/models/timesheet';

import {LIST_TIMESHEET_BY_MONTH, LIST_TIMESHEET_BY_MONTH_ERROR, LIST_TIMESHEET_BY_MONTH_SUCCESS} from '../../constant';

interface TimekeepingAction {
  type: string;
  params?: any;
  error?: AppError;
  payload?: ListResponseBase<Timesheet>;
}

export const getListTimesheetByMonth = (params: { date?: any, type?: any, employee_id?: string }): TimekeepingAction => {
  return ({
    type: LIST_TIMESHEET_BY_MONTH,
    params,
  });
}

export const listTimesheetByMonthError = (error: TimekeepingAction['error']): TimekeepingAction => {
  console.log("listTimesheetByMonthError");
  return ({
    type: LIST_TIMESHEET_BY_MONTH_ERROR,
    error
  });
}

export const listTimesheetByMonthSuccess = (payload: TimekeepingAction['payload']): TimekeepingAction => {
  console.log("listTimesheetByMonthSuccess - 2");
  return ({
    type: LIST_TIMESHEET_BY_MONTH_SUCCESS,
    payload: payload,
  });
}
