import { GET, POST, PUT, DELETE } from 'src/services';
import { ListResponseBase, ItemResponseBase } from 'src/models/common';
import { LeaveReason } from '../../types';

export const getLeaveReasonList = async (params?: any): Promise<ListResponseBase<LeaveReason>> => {
    console.log('params => ', params)
    const response = (await GET('hrmcoresvc/reasons', params)) as any;
    return {
        total: response.total,
        rows: response.rows || [],
        rc: response.rc,
    };
};

export const createReason = (params?: any): Promise<ItemResponseBase<LeaveReason>> => {
    return POST('hrmcoresvc/reasons', params);
};

export const deleteReason = (id?: string) => {
    return DELETE('hrmcoresvc/reasons?id=' + id);
};

export const updateReason = (id?: string, params?: any): Promise<ItemResponseBase<LeaveReason>> => {
    return PUT('hrmcoresvc/reasons/' + id, params);
};