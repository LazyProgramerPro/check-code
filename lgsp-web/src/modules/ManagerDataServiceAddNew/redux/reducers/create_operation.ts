import { NotificationSuccess } from 'src/components/Notification/Notification';
import {
  CLOSE_FORM_ADD_OPERATION,
  CREATE_OPERATION,
  DELETE_OPERATION,
  EDIT_OPERATION,
  OPEN_FORM_ADD_OPERATION,
  RESET_OPERATION,
  SAVE_OPERATION,
  SET_PAGE_OPERATION_TABLE,
  UPDATE_OPERATION,
} from '../constant';
import { CreateOperationAction, CreateOperationParams, CreateOperationState } from '../models';

const initCreateOperationParams: CreateOperationParams = {
  description: '',
  method: '',
  name: '',
  queryName: '',
};

const initState: CreateOperationState = {
  loading: false,
  show: false,
  error: undefined,
  isUpdate: false,
  params: initCreateOperationParams,
  operations: [] as typeof initCreateOperationParams[],
  operationsEdit: initCreateOperationParams,
  page: 1,
};

export const createOperationReducers = (
  state = initState,
  { type, show, params, error, isUpdate, operationName, operationUpdate, page }: CreateOperationAction,
): CreateOperationState => {
  switch (type) {
    case OPEN_FORM_ADD_OPERATION: {
      return {
        ...state,
        show: true,
        isUpdate: isUpdate,
        operationsEdit: initCreateOperationParams,
      };
    }

    case CLOSE_FORM_ADD_OPERATION: {
      return {
        ...state,
        show: false,
      };
    }

    case CREATE_OPERATION: {
      // const arr = [...state.operations];
      // if (params) arr.push(params);
      let arr;
      if (params) {
        arr = [params, ...state.operations];
      } else {
        arr = [...state.operations];
      }
      return {
        ...state,
        operations: arr,
        page: 1,
      };
    }

    case DELETE_OPERATION: {
      const newArr = state.operations.filter(e => e.name !== operationName);
      NotificationSuccess('Thành công', 'Xóa Operation thành công');
      return {
        ...state,
        operations: newArr,
      };
    }

    case EDIT_OPERATION: {
      return {
        ...state,
        show: true,
        isUpdate: true,
        operationsEdit: params,
      };
    }

    case SAVE_OPERATION: {
      const arr = [...state.operations];

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
        operations: newArr,
        operationsEdit: initCreateOperationParams,
      };
    }

    // update

    case UPDATE_OPERATION:
      return {
        ...state,
        operations: operationUpdate || [],
      };

    case RESET_OPERATION:
      return {
        ...state,
        loading: false,
        show: false,
        error: undefined,
        isUpdate: false,
        params: initCreateOperationParams,
        operations: [] as typeof initCreateOperationParams[],
        operationsEdit: initCreateOperationParams,
      };
    case SET_PAGE_OPERATION_TABLE:
      return {
        ...state,
        page: page || 1,
      };
    default:
      return state;
  }
};
