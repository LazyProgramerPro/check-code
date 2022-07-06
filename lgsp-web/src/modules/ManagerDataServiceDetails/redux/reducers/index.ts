import { combineReducers } from 'redux';
import { GET_DETAIL_DATA_SERVICE, GET_DETAIL_DATA_SERVICE_ERROR, GET_DETAIL_DATA_SERVICE_SUCCESS } from '../constant';
import {
  DetailDataService,
  DetailDataServiceAction,
  DetailDataServiceState,
  DetailDataSource,
  DetailOutput,
  DetailParams,
  DetailQuery,
} from './../models';

const initDetailOutput: DetailOutput = {
  name: '',
  columnName: '',
  dataType: '',
  fieldName: '',
  id: '',
  paramType: '',
  queryName: '',
};

const initDetailParams: DetailParams = {
  defaultValue: '',
  id: '',
  inputMappingInOutType: '',
  name: '',
  optional: false,
  paramType: '',
  queryName: '',
  sqlType: '',
};

const initDetailQuery: DetailQuery = {
  id: '',
  name: '',
  query: '',
  responseType: '',
  params: [] as typeof initDetailParams[],
  outputs: [] as typeof initDetailOutput[],
  dataSourceName: '',
  response: '',
};

const initDetailDataSource: DetailDataSource = {
  id: '',
  dbType: '',
  name: '',
  dataSourceType: '',
  server: '',
  database: '',
  port: '',
  username: '',
  password: '',
  driverClass: '',
  filename: null,
  url: null,
  separator: null,
  startingRow: null,
  maxRowRead: null,
  enableHeader: null,
  rowContainHeader: null,
  queries: [] as typeof initDetailQuery[],
};

const initDetailDataService: DetailDataService = {
  name: '',
  description: '',
  createBy: '',
  createAt: '',
  status: '',
  httpEndpoint: '',
  httpsEndpoint: '',
  lastUpdate: '',
  dataSources: [] as typeof initDetailDataSource[],
  queryEntities: [] as typeof initDetailQuery[],
  operationEntities: [],
  resourceEntities: [],
};

const initState: DetailDataServiceState = {
  loading: false,
  show: false,
  params: initDetailDataService,
  error: undefined,
};

const DetailDataServiceReducer = (
  state = initState,
  { type, params, error, id }: DetailDataServiceAction,
): DetailDataServiceState => {
  switch (type) {
    case GET_DETAIL_DATA_SERVICE:
      return {
        ...state,
        loading: true,
        params: initDetailDataService,
      };

    case GET_DETAIL_DATA_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        params: params,
      };

    case GET_DETAIL_DATA_SERVICE_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };

    default:
      return state;
  }
};

export interface DetailDataServiceModuleState {
  detailDataService: DetailDataServiceState;
}

export default combineReducers<DetailDataServiceModuleState>({
  detailDataService: DetailDataServiceReducer,
});
