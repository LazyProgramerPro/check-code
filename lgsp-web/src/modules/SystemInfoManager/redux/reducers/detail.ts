import { InforDetail, InforDetailState, InforDetailAction } from '../models';
import { DETAIL_INFOR, DETAIL_INFOR_SUCCESS, DETAIL_INFOR_ERROR, RELOAD_DATA_DETAIL } from '../constants';
const initData: InforDetail = {
  id: '',
  status: '',
  type: 0,
  content: '',
  create_at: 0,
  update_at: 0,
  create_by: '',
  update_by: '',
};

const initState: InforDetailState = {
  loading: false,
  item: initData,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const detailState = (
  state = initState,
  { type, payload, error, params }: InforDetailAction,
): InforDetailState => {
  switch (type) {
    case DETAIL_INFOR: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case DETAIL_INFOR_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case DETAIL_INFOR_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_DETAIL: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
