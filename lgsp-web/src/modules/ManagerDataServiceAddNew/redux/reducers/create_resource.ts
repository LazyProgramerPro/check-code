import { NotificationSuccess } from 'src/components/Notification/Notification';
import {
  CLOSE_FORM_ADD_RESOURCE,
  CREATE_RESOURCE,
  DELETE_RESOURCE,
  EDIT_RESOURCE,
  OPEN_FORM_ADD_RESOURCE,
  RESET_RESOURCE,
  SAVE_RESOURCE,
  SET_PAGE_RESOURCE_TABLE,
  UPDATE_DATARESOURCE,
} from '../constant';
import { CreateResourceAction, CreateResourceParams, CreateResourceState } from '../models';

const initCreateResourceParams: CreateResourceParams = {
  description: '',
  method: '',
  path: '',
  queryName: '',
};

const initState: CreateResourceState = {
  loading: false,
  show: false,
  error: undefined,
  isUpdate: false,
  resources: [] as typeof initCreateResourceParams[],
  resourcesEdit: initCreateResourceParams,
  params: initCreateResourceParams,
  page: 1,
};

export const createResourceReducers = (
  state = initState,
  {
    type,
    show,
    params,
    error,
    isUpdate,
    resourcePath,
    resourceMethod,
    updateResource,
    idResource,
    page,
  }: CreateResourceAction,
): CreateResourceState => {
  switch (type) {
    case OPEN_FORM_ADD_RESOURCE: {
      return {
        ...state,
        show: true,
        isUpdate: isUpdate,
        resourcesEdit: initCreateResourceParams,
      };
    }

    case CLOSE_FORM_ADD_RESOURCE: {
      return {
        ...state,
        show: false,
      };
    }

    case CREATE_RESOURCE: {
      // const arr = [...state.resources];
      // if (params) {
      //   arr.push(params);
      // }
      let arr;
      if (params) {
        arr = [params, ...state.resources];
      } else {
        arr = [...state.resources];
      }
      return {
        ...state,
        resources: arr,
        page: 1,
      };
    }

    case DELETE_RESOURCE: {
      const newArr = state.resources.filter(e => !(e.path === resourcePath && e.method === resourceMethod));
      // const newMeth = state.resources.filter(e => e.method !== resourceMethod)
      NotificationSuccess('Thành công', 'Xóa Resource thành công ');
      return {
        ...state,
        resources: newArr,
      };
    }

    case EDIT_RESOURCE: {
      return {
        ...state,
        show: true,
        isUpdate: true,
        resourcesEdit: params,
      };
    }

    case SAVE_RESOURCE: {
      const temp = [...state.resources];

      const newArr = temp.map(e => {
        if (!e.id) {
          return e;
        }

        if (e.id === params?.id) {
          e = { ...params };
          return e;
        }
        return e;
      });

      return {
        ...state,
        show: true,
        isUpdate: true,
        resources: newArr,
        resourcesEdit: initCreateResourceParams,
      };
    }

    // update
    case UPDATE_DATARESOURCE:
      return {
        ...state,
        resources: updateResource || [],
      };

    case RESET_RESOURCE:
      return {
        ...state,
        loading: false,
        show: false,
        error: undefined,
        isUpdate: false,
        resources: [] as typeof initCreateResourceParams[],
        resourcesEdit: initCreateResourceParams,
        params: initCreateResourceParams,
      };
    case SET_PAGE_RESOURCE_TABLE:
      return {
        ...state,
        page: page || 1,
      };
    default:
      return state;
  }
};
