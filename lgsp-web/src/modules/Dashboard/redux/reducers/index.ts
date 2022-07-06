import { combineReducers } from 'redux';
import statisticByMonth, { StatisticByMonthState } from './get-statistic';
import listTimesheetByMonth, { ListTimesheetByMonthState } from './list-timesheet';
import listAttendanceByMonth, { ListAttendanceByMonthState } from './list-attendance';

export interface DashboardModuleState {
    statisticByMonth: StatisticByMonthState,
    listTimesheetByMonth: ListTimesheetByMonthState;
    listAttendanceByMonth: ListAttendanceByMonthState;
}

export default combineReducers<DashboardModuleState>({
    statisticByMonth,
    listTimesheetByMonth,
    listAttendanceByMonth,
});
