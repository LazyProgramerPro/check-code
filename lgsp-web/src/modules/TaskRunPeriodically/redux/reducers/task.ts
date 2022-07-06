import {
  CLOSE_FORM_ADD_TASK,
  GET_LIST_DATA_SERVICE_TASK,
  GET_LIST_DATA_SERVICE_TASK_ERROR,
  GET_LIST_DATA_SERVICE_TASK_SUCCESS,
  GET_LIST_OPERATION,
  GET_LIST_OPERATION_ERROR,
  GET_LIST_OPERATION_SUCCESS,
  GET_LIST_TASK,
  GET_LIST_TASK_ERROR,
  GET_LIST_TASK_SUCCESS,
  LOAD_PAGE,
  OPEN_FORM_ADD_TASK,
  RELOAD_LIST_DATA,
} from '../constant';
import { ListDataService, TaskAction, TaskParams, TaskState } from '../models';

const initTaskParams: TaskParams = {
  count: 0,
  createAt: 'string',
  dataServiceId: 'string',
  dataServiceName: 'string',
  delayTime: 0,
  id: 'string',
  operationName: 'string',
  startTime: 'string',
};

const initListDataService: ListDataService = {
  id: '',
  name: '',
  description: '',
  dataSources: [],
  dataSourceConfigs: [],
  multipartFileList: undefined,
  operations: [],
  queries: [],
  resources: [],
  file: [],
};

const initState: TaskState = {
  loading: false,
  show: false,
  paramsGetList: undefined,
  tasksEdit: initTaskParams,
  tasks: [] as typeof initTaskParams[],
  listDataService: [] as typeof initListDataService[],
  listOperation: [],
  error: undefined,
  isUpdate: false,
  flag_reload: false,
};

export const taskReducers = (
  state = initState,
  { type, show, params, error, isUpdate, paramsGetList, listDataService, listOperation }: TaskAction,
): TaskState => {
  switch (type) {
    case OPEN_FORM_ADD_TASK: {
      return {
        ...state,
        show: true,
        isUpdate: isUpdate,
      };
    }

    case CLOSE_FORM_ADD_TASK: {
      return {
        ...state,
        show: false,
      };
    }

    case GET_LIST_TASK: {
      return {
        ...state,
        loading: true,
        paramsGetList: {
          ...state.paramsGetList,
          ...paramsGetList,
        },
      };
    }

    case GET_LIST_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: params,
      };
    }

    case GET_LIST_TASK_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }
    case RELOAD_LIST_DATA: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    case LOAD_PAGE: {
      return {
        ...state,
        load_page: !state.load_page,
      };
    }

    // GET_LIST_DATA_SERVICE

    case GET_LIST_DATA_SERVICE_TASK: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_LIST_DATA_SERVICE_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        listDataService: listDataService,
      };
    }

    case GET_LIST_DATA_SERVICE_TASK_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    // GET_LIST_OPERATION

    case GET_LIST_OPERATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_LIST_OPERATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        listOperation: listOperation,
      };
    }

    case GET_LIST_OPERATION_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
};
