import { NotificationSuccess } from 'src/components/Notification/Notification';
import {
  CLOSE_FORM_ADD,
  CREATE_DATA_SOURCE,
  DELETE_DATA_SOURCE,
  EDIT_DATA_SOURCE,
  OPEN_FORM_ADD,
  RESET_DATA_SOURCE,
  SAVE_EDIT_DATA_SOURCE,
  SET_PAGE_DATA_SOURCE_TABLE,
  // SET_CREATE_DATA_SOURCE,
  UPDATE_DATA_SOURCE,
} from '../constant';
import { CreateDataSourceAction, CreateDataSourceParams, CreateDataSourceState } from '../models';

const initDataSourceConfig: CreateDataSourceParams = {
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
  url: undefined,
  id: '',
};

const initState: CreateDataSourceState = {
  loading: false,
  show: false,
  error: undefined,
  isUpdate: false,
  DataSourceConfigs: [] as typeof initDataSourceConfig[],
  DataSourceConfigEdit: initDataSourceConfig,
  page: 1,
};

export const createDataSourceReducers = (
  state = initState,
  {
    type,
    show,
    params,
    error,
    isUpdate,
    nameDataSource,
    dataSourceConfigsUpdate,
    datasourceForCreate,
    page,
  }: CreateDataSourceAction,
): CreateDataSourceState => {
  switch (type) {
    case OPEN_FORM_ADD: {
      return {
        ...state,
        show: true,
        isUpdate: isUpdate,
      };
    }

    case CLOSE_FORM_ADD: {
      return {
        ...state,
        show: false,
        DataSourceConfigEdit: initDataSourceConfig,
      };
    }

    case CREATE_DATA_SOURCE: {
      // const arr = [...state.DataSourceConfigs];
      // if (params) {
      //   arr.push(params);
      // }
      let arr;
      if (params) {
        arr = [params, ...state.DataSourceConfigs];
      } else {
        arr = [...state.DataSourceConfigs];
      }
      return {
        ...state,
        DataSourceConfigs: arr,
        DataSourceConfigEdit: initDataSourceConfig,
        page: 1,
      };
    }

    // case SET_CREATE_DATA_SOURCE:
    //   return {
    //     ...state,
    //     DataSourceConfigs: datasourceForCreate || []
    //   }

    case DELETE_DATA_SOURCE: {
      const newArr = state.DataSourceConfigs.filter(e => e.name !== nameDataSource);
      NotificationSuccess('Thành công', 'Xóa Data source thành công');
      return {
        ...state,
        DataSourceConfigs: newArr,
      };
    }

    case EDIT_DATA_SOURCE: {
      return {
        ...state,
        show: true,
        isUpdate: true,
        DataSourceConfigEdit: params,
      };
    }

    case SAVE_EDIT_DATA_SOURCE: {
      const arr = [...state.DataSourceConfigs];
      const newArr = arr.map(e => {
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
        DataSourceConfigEdit: initDataSourceConfig,
        DataSourceConfigs: newArr,
      };
    }

    // update

    case UPDATE_DATA_SOURCE:
      let ds = dataSourceConfigsUpdate || [];
      if (ds.length > 0) {
        for (let i = 0; i < ds.length; i++) {
          ds[i].is_new_file = false;
        }
      }
      return {
        ...state,
        DataSourceConfigs: ds,
      };

    case RESET_DATA_SOURCE:
      return {
        ...state,
        loading: false,
        show: false,
        error: undefined,
        isUpdate: false,
        DataSourceConfigs: [] as typeof initDataSourceConfig[],
        DataSourceConfigEdit: initDataSourceConfig,
      };
    case SET_PAGE_DATA_SOURCE_TABLE:
      return {
        ...state,
        page: page || 1,
      };
    default:
      return state;
  }
};
