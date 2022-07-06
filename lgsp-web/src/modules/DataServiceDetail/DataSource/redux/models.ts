import {AppError, ItemResponseBase, ListResponseBase} from "../../../../models/baseResponse";

export interface DataSourceEntity{
  id: string;
  name: string;
  type: string;
  username: string;
  password: string;
  db_type: number;
  server: string;
  port: number;
  database: string;
  create_by: string;
  create_at: string;
}

export interface GetDataSourceParams{
  text?: string;
  dbType?: string;
  dataServiceId?: string;
  page?: number;
  size?: number;
}

export interface GetDataSourceAction{
  type: string,
  params?: GetDataSourceParams,
  payload?: ListResponseBase<DataSourceEntity>
  error?: AppError,
}

export interface GetDataSourceState{
  loading: boolean,
  params?: GetDataSourceParams,
  error?: AppError,
  total: number,
  rows: DataSourceEntity[],
  flag_reload: boolean
}


export interface GetSingleDataSourceAction{
  type: string,
  dataSourceId?: string,
  payload?: ItemResponseBase<DataSourceEntity>
  error?: AppError,
}

export interface GetSingleDataSourceState{
  loading: boolean,
  dataSourceId?: string,
  error?: AppError,
  data?: DataSourceEntity,
  flag_reload: boolean
}

