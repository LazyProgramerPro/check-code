import {
  GET_DATA_DRIVER,
  GET_DATA_DRIVER_ERROR,
  GET_DATA_DRIVER_SUCCESS,
  LOAD_PAGE,
  RELOAD_DATA_DRIVER,
} from '../constanst';
import { DataDriver, GetDriverAction, GetDriverState } from '../models';

export const initDriver: DataDriver = {
  id: '',
  name: '',
  file_path: '',
  type: 0,
  version: '',
  create_at: '',
  update_at: '',
  create_by: '',
  update_by: '',
  isDefault: false,
  fileName: '',
};

const initState: GetDriverState = {
  loading: false,
  rows: [] as typeof initDriver[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getDriverState = (
  state = initState,
  { type, payload, error, params }: GetDriverAction,
): GetDriverState => {
  switch (type) {
    case GET_DATA_DRIVER: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_DATA_DRIVER_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows:
          payload?.rows.map((item, index) => {
            return {
              ...item,
              index,
            };
          }) || [],
        total: payload?.total || 0,
      };
    }

    case GET_DATA_DRIVER_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_DRIVER: {
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
    default:
      return state;
  }
};
