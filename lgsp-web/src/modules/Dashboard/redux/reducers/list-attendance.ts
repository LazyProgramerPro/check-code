import {AppError, ListResponseBase} from 'src/models/common';
import {Timesheet} from 'src/models/timesheet';
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

export interface ListAttendanceByMonthState {
  loading: boolean;
  error?: AppError;
  rows: Timesheet[];
  total: number;
}

const initialState: ListAttendanceByMonthState = {
  loading: false,
  rows: [],
  total: 0,
};

export default (state = initialState, action: TimekeepingAction): ListAttendanceByMonthState => {
  const {type, payload, error} = action;
  switch (type) {
    case LIST_ATTENDANCE_BY_MONTH:
      return {
        ...state,
        error: undefined,
        loading: true,
      };

    case LIST_ATTENDANCE_BY_MONTH_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };

    case LIST_ATTENDANCE_BY_MONTH_SUCCESS:
      return {
        ...state,
        rows: payload?.rows || [],
        total: payload?.total || 0,
        loading: false,
      };
    default:
      return state;
  }

};
