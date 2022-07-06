import {AppError, ListResponseBase} from 'src/models/common';
import {Timesheet} from 'src/models/timesheet';

import {GET_STATISTIC_BY_MONTH, GET_STATISTIC_BY_MONTH_ERROR, GET_STATISTIC_BY_MONTH_SUCCESS} from '../../constant';

interface StatisticAction {
  type: string;
  params?: any;
  error?: AppError;
  payload?: ListResponseBase<Timesheet>;
}

export const getStatisticByMonth = (params: { department_id?: string, type?: number, date?: string, employee_id?: string }): StatisticAction => {
  return ({
    type: GET_STATISTIC_BY_MONTH,
    params,
  });
}

export const getStatisticByMonthError = (error: StatisticAction['error']): StatisticAction => {
  return ({
    type: GET_STATISTIC_BY_MONTH_ERROR,
    error
  });
}

export const getStatisticByMonthSuccess = (payload: StatisticAction['payload']): StatisticAction => {
  return ({
    type: GET_STATISTIC_BY_MONTH_SUCCESS,
    payload,
  });
}
