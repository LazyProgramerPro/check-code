import { AppError } from 'src/models/common';

export interface DetailParams {
  defaultValue?: string;
  id: string;
  inputMappingInOutType?: string;
  name: string;
  optional: boolean;
  paramType: string;
  queryName?: string;
  sqlType: string;
}

export interface DetailOutput {
  name: string;
  columnName?: string;
  dataType: string;
  fieldName?: string;
  id: string;
  paramType: string;
  queryName?: string;
}

export interface DetailQuery {
  id: string;
  name: string;
  query: string;
  responseType: string;
  params: DetailParams[];
  outputs: DetailOutput[];
  dataSourceName: string;
  response: string;
}

export interface DetailDataSource {
  id: string;
  dbType: string;
  name: string;
  dataSourceType: string;
  server?: string;
  database?: string;
  port?: number | string;
  username: string;
  password: string;
  driverClass?: string;
  filename?: any;
  url?: any;
  separator?: any;
  startingRow?: any;
  maxRowRead?: any;
  enableHeader?: any;
  rowContainHeader?: any;
  queries: DetailQuery[];
}

export interface DetailDataService {
  name: string;
  description: string;
  createBy: string;
  createAt: string;
  status: string;
  active?: boolean;
  httpEndpoint: string;
  httpsEndpoint: string;
  lastUpdate: string;
  dataSources: DetailDataSource[];
  queryEntities?: DetailQuery[];
  resourceEntities?: any[];
  operationEntities?: any[];
  time?: string;
}

export interface DetailDataServiceState {
  loading?: boolean;
  show?: boolean;
  params?: DetailDataService;
  error?: AppError;
}

export interface DetailDataServiceAction {
  type: string;
  show?: boolean;
  params?: DetailDataService;
  error?: AppError;
  id?: string;
}
