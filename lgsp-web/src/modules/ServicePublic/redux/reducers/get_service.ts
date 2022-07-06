import { GET_SERVICE, GET_SERVICE_ERROR, GET_SERVICE_SUCCESS, LOAD_PAGE, RELOAD_DATA } from '../constants';
import { GetServiceAction, GetServiceState, ServiceData } from '../models';

export const initData: ServiceData = {
  name: '',
  description: '',
  numberApis: 0,
  id: '',
};
const initState: GetServiceState = {
  loading: false,
  rows: [] as typeof initData[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getState = (state = initState, { type, payload, error, params }: GetServiceAction): GetServiceState => {
  switch (type) {
    case GET_SERVICE: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_SERVICE_SUCCESS: {
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

    case GET_SERVICE_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA: {
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
