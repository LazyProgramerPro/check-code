import {
  CREATE_DATA_SERVICE,
  CREATE_DATA_SERVICE_ERROR,
  CREATE_DATA_SERVICE_SUCCESS,
  GET_DETAIL_DATA_SERVICE_UPDATE,
  GET_DETAIL_DATA_SERVICE_UPDATE_ERROR,
  GET_DETAIL_DATA_SERVICE_UPDATE_SUCCESS, LIST_DS_SCREEN, RESET_CREATED_STATUS,
  RESET_FORM_DATA_SERVICE, SET_LOADING, SET_SCREEN_NUMBER,
  UPDATE_DATA_SERVICE,
  UPDATE_DATA_SERVICE_ERROR,
  UPDATE_DATA_SERVICE_SUCCESS,
} from '../constant';
import {
  CreateDataServiceAction,
  CreateDataServiceParams,
  CreateDataServiceState,
  CreateDataSourceParams,
  CreateOperationParams,
  CreateResourceParams,
  OutputMappingEntity,
  QueryEntity,
  QueryParamEntity,
} from '../models';

const initDataSource: CreateDataSourceParams = {
  database: '',
  dbType: '',
  driverClass: '',
  enableHeader: true,
  filename: '',
  maxRowRead: 0,
  name: '',
  password: '',
  port: 0,
  queries: [],
  rowContainHeader: 0,
  separator: '',
  server: '',
  startingRow: 0,
  username: '',
  url: [],
  id: ''
};

const initCreateOperationParams: CreateOperationParams = {
  description: '',
  method: '',
  name: '',
  queryName: '',
};

const initQueryParamEntity: QueryParamEntity = {
  defaultValue: '',
  inputMappingInOutType: '',
  name: '',
  paramType: '',
  queryName: '',
  sqlType: '',
  optional: false,
};

const initOutputMappingEntity: OutputMappingEntity = {
  name: '',
  columnName: '',
  dataType: '',
  fieldName: '',
  paramType: '',
  queryName: '',
};

const initCreateQueryParams: QueryEntity = {
  dataSourceName: '',
  excelMaxRow: 0,
  excelStartingRow: 0,
  groupElement: '',
  name: '',
  outputs: [] as typeof initOutputMappingEntity[],
  params: [] as typeof initQueryParamEntity[],
  query: '',
  response: '',
  responseType: '',
  rowName: '',
  workbookName: '',
  id: ''
};

const initCreateResourceParams: CreateResourceParams = {
  description: '',
  method: '',
  path: '',
  queryName: '',
};

const initCreateDataServiceParams: CreateDataServiceParams = {
  id: '',
  name: '',
  description: '',
  dataSourceConfigs: [] as typeof initDataSource[],
  multipartFileList: '',
  operations: [] as typeof initCreateOperationParams[],
  queries: [] as typeof initCreateQueryParams[],
  resources: [] as typeof initCreateResourceParams[],
};

const initState: CreateDataServiceState = {
  loading: false,
  show: false,
  error: undefined,
  isUpdate: false,
  params: initCreateDataServiceParams,
  dataServiceUpdate: initCreateDataServiceParams,
  idDataServiceCreated: '',
  statusCreated: false,
  current_screen: LIST_DS_SCREEN
};

export const createDataServiceReducers = (
  state = initState,
  {type, show, params, error, idDataServiceCreated, screen, loading}: CreateDataServiceAction,
): CreateDataServiceState => {
  switch (type) {
    case CREATE_DATA_SERVICE:
      return {
        ...state,
        isUpdate: false,
        loading: true,
        statusCreated: false,
        idDataServiceCreated: '',
        params: {
          ...state.params,
          ...params,
        },
      };

    case CREATE_DATA_SERVICE_SUCCESS:
      console.log('idDataServiceCreated', idDataServiceCreated);
      return {
        ...state,
        statusCreated: true,
        idDataServiceCreated: idDataServiceCreated,
        loading: false,
        current_screen: LIST_DS_SCREEN
      };

    case CREATE_DATA_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        statusCreated: false,
        idDataServiceCreated: '',
        error: error,
      };

    case RESET_FORM_DATA_SERVICE:
      let curr = state.current_screen;
      return {
        loading: false,
        show: false,
        error: undefined,
        isUpdate: false,
        params: initCreateDataServiceParams,
        dataServiceUpdate: initCreateDataServiceParams,
        current_screen: curr
      };

    // UPDATE

    case GET_DETAIL_DATA_SERVICE_UPDATE:
      return {
        ...state,
        isUpdate: true,
        loading: true,
        dataServiceUpdate: initCreateDataServiceParams,
      };

    case GET_DETAIL_DATA_SERVICE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataServiceUpdate: params,
      };

    case GET_DETAIL_DATA_SERVICE_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    // UPDATE

    case UPDATE_DATA_SERVICE:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case UPDATE_DATA_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_DATA_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    case SET_SCREEN_NUMBER:
      return {
        ...state,
        current_screen: screen || LIST_DS_SCREEN
      }

    case RESET_CREATED_STATUS:
      return {
        ...state,
        statusCreated: false
      }

    case SET_LOADING:
      let l = loading ? loading : false;
      return {
        ...state,
        loading: l
      }

    default:
      return state;

  }
};
