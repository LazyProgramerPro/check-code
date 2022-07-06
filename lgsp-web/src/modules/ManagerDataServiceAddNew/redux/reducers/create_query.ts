import { NotificationSuccess } from 'src/components/Notification/Notification';
import {
  CLOSE_FORM_ADD_QUERY,
  CREATE_QUERY_PARAM,
  DELETE_QUERY_PARAM,
  EDIT_QUERY_PARAM,
  OPEN_FORM_ADD_QUERY,
  RESET_QUERY_PARAM,
  SAVE_QUERY_PARAM,
  SET_PAGE_QUERY_TABLE,
  SET_QUERY_PARAM1,
  UPDATE_QUERY_PARAM,
} from '../constant';
import { CreateQueryAction, CreateQueryState, OutputMappingEntity, QueryEntity, QueryParamEntity } from '../models';

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
  id: '',
};

const initState: CreateQueryState = {
  loading: false,
  show: false,
  error: undefined,
  isUpdate: false,
  queries: [] as typeof initCreateQueryParams[],
  queryEdit: initCreateQueryParams,
  page: 1,
};

export const createQueryReducers = (
  state = initState,
  { type, show, params, error, isUpdate, queryName, updateQuery, queries, page }: CreateQueryAction,
): CreateQueryState => {
  switch (type) {
    case SET_QUERY_PARAM1: {
      console.log(queries);

      return {
        ...state,
        queries: queries || [],
      };
    }

    case OPEN_FORM_ADD_QUERY: {
      return {
        ...state,
        show: true,
        isUpdate: isUpdate,
        // queryEdit: initCreateQueryParams,
      };
    }

    case CLOSE_FORM_ADD_QUERY: {
      return {
        ...state,
        show: false,
        queryEdit: initCreateQueryParams,
      };
    }

    case CREATE_QUERY_PARAM: {
      // const arr = [...state.queries];
      // if (params) {
      //   arr.push(params);
      // }
      let arr;
      if (params) {
        arr = [params, ...state.queries];
      } else {
        arr = [...state.queries];
      }
      return {
        ...state,
        queries: arr,
        page: 1,
      };
    }

    case DELETE_QUERY_PARAM: {
      const newArr = state.queries.filter(e => e.name !== queryName);
      NotificationSuccess('Thành công', 'Xóa câu lệnh thành công ');
      return {
        ...state,
        queries: newArr,
      };
    }

    case EDIT_QUERY_PARAM: {
      return {
        ...state,
        show: true,
        isUpdate: true,
        queryEdit: params,
      };
    }

    case SAVE_QUERY_PARAM: {
      const arr = [...state.queries];

      const newArr = arr.map(e => {
        if (e.name === params?.name) {
          e = { ...params };
          return e;
        }
        return e;
      });

      return {
        ...state,
        show: true,
        isUpdate: true,
        queries: newArr,
        queryEdit: initCreateQueryParams,
      };
    }

    // update
    case UPDATE_QUERY_PARAM:
      return {
        ...state,
        queries: updateQuery || [],
      };

    case RESET_QUERY_PARAM:
      return {
        ...state,
        loading: false,
        show: false,
        error: undefined,
        isUpdate: false,
        queries: [] as typeof initCreateQueryParams[],
        queryEdit: initCreateQueryParams,
      };

    case SET_PAGE_QUERY_TABLE:
      return {
        ...state,
        page: page || 1,
      };
    default:
      return state;
  }
};
