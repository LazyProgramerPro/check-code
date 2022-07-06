import {AppError, ItemResponseBase, ListResponseBase} from "../../../../models/baseResponse";


export interface QueryEntity{
  id: string;
  name: string;
  data_service_id: string;
  data_source_id: string;
  data_source_name: string;
  response_type: number;
  json_response: string;
  query: string;
  database: string;
  create_by: string;
  create_at: string;
}

export interface GetQueryParams{
  text?: string;
  dataSourceId?: string;
  page?: number;
  size?: number;
}

export interface GetQueryAction{
  type: string,
  params?: GetQueryParams,
  payload?: ListResponseBase<QueryEntity>
  error?: AppError,
}

export interface GetQueryState{
  loading: boolean,
  params?: GetQueryParams,
  error?: AppError,
  total: number,
  rows: QueryEntity[],
  flag_reload: boolean
}

export interface GetQueryDetailAction{
  type: string,
  queryId?: string,
  show?: boolean,
  payload?: ItemResponseBase<QueryDataDetail>
  error?: AppError,
}

export interface GetQueryDetailState{
  loading: boolean,
  queryId?: string,
  show?: boolean,
  error?: AppError,
  data?: QueryDataDetail,
  flag_reload: boolean
}

export interface QueryDataDetail{
  query: QueryEntity,
  resource: ResourceEntity,
  param: Param[],
}

export interface ResourceEntity{
  path: string,
  description: string,
  method: string
}

export interface Param{
  param_type: string,
  sql_type: string,
  optional: boolean,
  default_value: string
}
