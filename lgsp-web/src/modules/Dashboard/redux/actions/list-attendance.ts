import { ListResponseBase, AppError } from 'src/models/common';
import { Timesheet } from 'src/models/timesheet';

import {
    LIST_ATTENDANCE_BY_MONTH,
    LIST_ATTENDANCE_BY_MONTH_ERROR,
    LIST_ATTENDANCE_BY_MONTH_SUCCESS
} from '../../constant';

interface TimekeepingAction {
    type: string;
    params?: any;
    error?: AppError;
    payload?: ListResponseBase<Timesheet>;
}

export const getListAttendanceByMonth = (params: {page?: any, size?: any,  date?: any, employee_id?: any }): TimekeepingAction => {
    return ({
        type: LIST_ATTENDANCE_BY_MONTH,
        params,
    });
}

export const listAttendanceByMonthError = (error: TimekeepingAction['error']): TimekeepingAction => {
    return ({
        type: LIST_ATTENDANCE_BY_MONTH_ERROR,
        error,
    });
}

export const listAttendanceByMonthSuccess = (payload: TimekeepingAction['payload']): TimekeepingAction => {
    return ({
        type: LIST_ATTENDANCE_BY_MONTH_SUCCESS,
        payload,
    });
}
