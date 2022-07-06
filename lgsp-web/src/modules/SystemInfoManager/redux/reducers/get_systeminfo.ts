import { GET_SYSTEM_INTRO, GET_SYSTEM_INTRO_ERROR, GET_SYSTEM_INTRO_SUCCESS, RELOAD_DATA } from '../constants';
import { DataSystemInfo, GetSystemInfoAction, GetSystemInfoState } from '../models';

export const initData: DataSystemInfo = {
  id: '',
  status: '',
  type: 0,
  content: '',
  create_at: 0,
  update_at: 0,
  create_by: '',
  update_by: '',
};
const initState: GetSystemInfoState = {
  loading: false,
  rows: [] as typeof initData[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getSystemInfoState = (
  state = initState,
  { type, payload, error, params }: GetSystemInfoAction,
): GetSystemInfoState => {
  switch (type) {
    case GET_SYSTEM_INTRO: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_SYSTEM_INTRO_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows: payload?.rows || [],
        total: payload?.total || 0,
      };
    }

    case GET_SYSTEM_INTRO_ERROR: {
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
