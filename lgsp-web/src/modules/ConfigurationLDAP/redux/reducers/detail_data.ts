import { DETAIL_DATA, DETAIL_DATA_ERROR, DETAIL_DATA_SUCCESS, RELOAD_DATA_DETAIL } from '../constanst';
import { DataDetail, DataDetailAction, DataDetailState } from '../models';

const initData: DataDetail = {
  connectionName: '',
  connectionPassword: '',
  connectionUrl: '',
  createBy: '',
  createTime: '',
  description: '',
  domainName: '',
  id: '',
  status: '',
  userListFilter: '',
  userSearchBase: '',
  userSearchFilter: '',
  usernameAttribute: '',
};

const initState: DataDetailState = {
  loading: false,
  item: initData,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const detailState = (state = initState, { type, payload, error, params }: DataDetailAction): DataDetailState => {
  switch (type) {
    case DETAIL_DATA: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case DETAIL_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case DETAIL_DATA_ERROR: {
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
