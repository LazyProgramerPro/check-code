import { AppError, ListResponseBase } from 'src/models/common';
export interface LogData {
  code: number;
  content: string;
  provider: string;
  time: string;
  type: string;
}
export interface GetLogParams {
  page?: number;
  size?: number;
  key?: string;
  status?: number;
  code?: number;
  type?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetLogAction {
  type: string;
  params?: GetLogParams;
  payload?: ListResponseBase<LogData>;
  error?: AppError;
  total?: number;
}

export interface GetLogState {
  loading: boolean;
  params?: GetLogParams;
  total: number;
  rows: LogData[];
  error?: AppError;
  flag_reload: boolean;
}

export interface GetLogResponse {
  error?: AppError;
  playload?: ListResponseBase<LogData>;
}
