import { GET_CACHING, GET_CACHING_ERROR, GET_CACHING_SUCCESS, RELOAD_DATA } from "../constants";
import { CachingData, GetCachingAction, GetCachingState } from "../models";

export const initData: CachingData = {
  apiId: '',
  apiName: '',
  cachingTime: 0,
  organization: '',
}
const initState: GetCachingState = {
  loading: false,
  rows: [] as typeof initData[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getState = (state = initState, { type, payload, error, params }: GetCachingAction): GetCachingState => {
  switch (type) {
    case GET_CACHING: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_CACHING_SUCCESS: {
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

    case GET_CACHING_ERROR: {
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
    default:
      return state;
  }
};
