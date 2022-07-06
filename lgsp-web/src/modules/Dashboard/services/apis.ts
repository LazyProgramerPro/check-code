import {GET} from 'src/services';
import {ItemResponseBase, ListResponseBase} from 'src/models/common';
import {Timesheet} from 'src/models/timesheet';

export const getStatisticByMonth = async (params?: any): Promise<{}> => {
  const response = (await GET('hrmcoresvc/dashboard/general', params)) as any;
  return {
    data: response.item
  };
};

export const getListTimesheetByMonth = async (params?: any): Promise<ItemResponseBase<Timesheet>> => {
  const response = (await GET('hrmcoresvc/timesheet', params)) as any;
  // const response = (await FAKE_DATA('./timesheet.json')) as any;
  return {
    item: response.item,
    rc: response.rc,
  };
};

export const getListAttendanceByMonth = async (params?: any): Promise<ListResponseBase<Timesheet>> => {
  const response = (await GET('hrmcoresvc/attendance-events/historyByEmployee', params)) as any;
  // const response = (await FAKE_DATA('./history.json')) as any;
  return {
    total: response.total,
    rows: response.pages?.content || [],
    rc: response.rc,
  };
};
