import { GET_RESOURCE, GET_RESOURCE_ERROR, GET_RESOURCE_SUCCESS, LOAD_PAGE, RELOAD_DATA_RESOURCE } from '../constanst';
import { Resource, GetResourceState, GetResourceAction } from '../models';

export const initResource: Resource = {
  id: 0,
  name: '',
  displayName: '',
  description: '',
  quotaType: '',
  quota: 0,
  quotaUnit: '',
  unitTime: 0,
  timeUnit: '',
  uuid: '',
  deployed: false,
};
const initState: GetResourceState = {
  loading: false,
  rows: [] as typeof initResource[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getResourceState = (
  state = initState,
  { type, payload, error, params }: GetResourceAction,
): GetResourceState => {
  switch (type) {
    case GET_RESOURCE: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_RESOURCE_SUCCESS: {
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

    case GET_RESOURCE_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_RESOURCE: {
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
