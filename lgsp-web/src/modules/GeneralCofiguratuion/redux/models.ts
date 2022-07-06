import { AppError, ItemResponseBase } from 'src/models/common';
export interface DataGeneral{
  threadNumber: string;
  directoryNumber: string;
  loggingDirectoryNumber: string;
}
export interface DataGeneralParams {
  key?: string;
  status?: number;
  id?: string;
}
export interface DataGeneralAction {
  type: string;
  params?: DataGeneralParams;
  payload?: ItemResponseBase<DataGeneral>;
  error?: AppError;
}

export interface DataGeneralState {
  loading: boolean;
  params?:DataGeneralParams;
  total: number;
  item?: DataGeneral;
  error?: AppError;
  flag_reload: boolean;
}

export interface DataGeneralResponse {
  error?: AppError;
  playload?: ItemResponseBase<DataGeneral>;
}
