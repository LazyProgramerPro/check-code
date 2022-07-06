import { GET_INFORMATION, GET_INFORMATION_ERROR, GET_INFORMATION_SUCCESS, RELOAD_DATA_INFORMATION } from '../constanst';
import { GetInformationAction, GetInformationState, Information } from '../models';

const initInfor: Information = {
  id: '',
  name: '',
  version: '',
  provider: '',
  lifeCycleStatus: '',
  description: '',
  cacheTimeout: 0,
  createTime: '',
  deploymentUnit: '',
  categories: [],
  keyManagers: '',
  register: '',
  departmentLevel: '',
  policies: [],
  deploymentLevel: '',
  httpEndpoint: '',
  httpsEndpoint: '',
};

const initState: GetInformationState = {
  loading: false,
  item: initInfor,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getInformationState = (
  state = initState,
  { type, payload, error, params }: GetInformationAction,
): GetInformationState => {
  switch (type) {
    case GET_INFORMATION: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_INFORMATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case GET_INFORMATION_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_INFORMATION: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
