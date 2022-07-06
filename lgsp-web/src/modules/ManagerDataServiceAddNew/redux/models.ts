import { AppError } from 'src/models/common';

//DataSource
export interface OutputMappingEntity {
  name: string;
  columnName?: string;
  dataType: string;
  fieldName?: string;
  paramType: string;
  queryName?: string;
}

export interface QueryParamEntity {
  defaultValue: string;
  inputMappingInOutType?: string;
  name: string;
  optional: boolean;
  paramType: string;
  queryName?: string;
  sqlType: string;
}

export interface QueryEntity {
  dataSourceName: string;
  excelMaxRow: number;
  excelStartingRow: number;
  groupElement: string;
  name: string;
  outputs?: OutputMappingEntity[];
  params?: QueryParamEntity[];
  query: string;
  response: string;
  responseType: string;
  rowName: string;
  workbookName: string;
  id: string;
}

export interface CreateDataSourceParams {
  database: string;
  dbType: string;
  driverClass: string;
  enableHeader: boolean;
  filename: string;
  maxRowRead: number;
  name: string;
  password: string;
  port: number;
  queries?: QueryEntity[];
  rowContainHeader: number;
  separator: string;
  server: string;
  startingRow: number;
  username: string;
  url?: any;
  databaseName?: string;
  is_new_file?: boolean;
  id: string;
}

export interface CreateDataSourceState {
  loading: boolean;
  show: boolean;
  DataSourceConfigs: CreateDataSourceParams[];
  DataSourceConfigEdit?: CreateDataSourceParams;
  error?: AppError;
  isUpdate?: boolean;
  page: number;
}

export interface CreateDataSourceAction {
  type: string;
  show?: boolean;
  params?: CreateDataSourceParams;
  dataSourceConfigsUpdate?: CreateDataSourceParams[];
  error?: AppError;
  isUpdate?: boolean;
  nameDataSource?: string;
  datasourceForCreate?: CreateDataSourceParams[];
  page?: number;
}

//Query
export interface CreateQueryState {
  loading: boolean;
  show: boolean;
  queries: QueryEntity[];
  error?: AppError;
  isUpdate?: boolean;
  queryEdit?: QueryEntity;
  page: number;
}

export interface CreateQueryAction {
  type: string;
  show?: boolean;
  params?: QueryEntity;
  updateQuery?: QueryEntity[];
  error?: AppError;
  isUpdate?: boolean;
  queryName?: string;
  // dautv add
  queries?: QueryEntity[];
  q_ds_action?: CreateDataSourceAction;
  page?: number;
}

//Resource
export interface CreateResourceParams {
  description: string;
  method: string;
  path: string;
  queryName: string;
  id?: string;
}

export interface CreateResourceState {
  loading: boolean;
  show: boolean;
  params?: CreateResourceParams;
  resources: CreateResourceParams[];
  resourcesEdit?: CreateResourceParams;
  error?: AppError;
  isUpdate?: boolean;
  page: number;
}

export interface CreateResourceAction {
  type: string;
  show?: boolean;
  params?: CreateResourceParams;
  updateResource?: CreateResourceParams[];
  error?: AppError;
  isUpdate?: boolean;
  resourcePath?: string;
  resourceMethod?: string;
  idResource?: string;
  page?: number;
}

//Operation
export interface CreateOperationParams {
  description: string;
  method: string;
  name: string;
  queryName: string;
}

export interface CreateOperationState {
  loading: boolean;
  show: boolean;
  params?: CreateOperationParams;
  operationsEdit?: CreateOperationParams;
  operations: CreateOperationParams[];
  error?: AppError;
  isUpdate?: boolean;
  page: number;
}

export interface CreateOperationAction {
  type: string;
  show?: boolean;
  params?: CreateOperationParams;
  operationUpdate?: CreateOperationParams[];
  error?: AppError;
  isUpdate?: boolean;
  operationName?: string;
  page?: number;
}

// data services
export interface CreateDataServiceParams {
  id?: string;
  name: string;
  description: string;
  dataSources?: CreateDataSourceParams[];
  dataSourceConfigs: CreateDataSourceParams[];
  multipartFileList?: any;
  operations: CreateOperationParams[];
  queries: QueryEntity[];
  resources: CreateResourceParams[];
  file?: any;
}

export interface CreateDataServiceState {
  loading: boolean;
  show: boolean;
  params: CreateDataServiceParams;
  dataServiceUpdate?: CreateDataServiceParams;
  CreateDataServiceRequest?: CreateDataServiceParams;
  error?: AppError;
  isUpdate?: boolean;
  idDataServiceCreated?: string;
  statusCreated?: boolean;
  //
  current_screen: number;
}

export interface CreateDataServiceAction {
  type: string;
  show?: boolean;
  params?: CreateDataServiceParams;
  error?: AppError;
  id?: string;
  idDataServiceCreated?: string;
  //
  screen?: number;
  loading?: boolean;
  //
  history?: any;
}

//Genarate input
export interface paramsGenarateInput {
  query: string;
}
//Genarate output
export interface paramsGenarateOutput {
  query: string;
}
