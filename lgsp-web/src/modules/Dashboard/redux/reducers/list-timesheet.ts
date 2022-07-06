import { AppError } from 'src/models/common';

import {
    LIST_TIMESHEET_BY_MONTH,
    LIST_TIMESHEET_BY_MONTH_ERROR,
    LIST_TIMESHEET_BY_MONTH_SUCCESS
} from '../../constant';

export interface ListTimesheetByMonthState {
    loading: boolean;
    error?: AppError;
    item?: any;
}

const initialState: ListTimesheetByMonthState = {
    loading: false
};

export default (state = initialState, action: any): ListTimesheetByMonthState => {
    const { type, payload, error } = action;
    switch (type) {
        case LIST_TIMESHEET_BY_MONTH:
            return {
                ...state,
                error: undefined,
                loading: true,
            };

        case LIST_TIMESHEET_BY_MONTH_ERROR:
            return {
                ...state,
                error,
                loading: false,
            };

        case LIST_TIMESHEET_BY_MONTH_SUCCESS:
            return {
                ...state,
                item: payload.item,
                loading: false,
            };
        default:
            return state;
    }
};
