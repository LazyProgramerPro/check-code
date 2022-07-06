import { GET_DATA, GET_DATA_ERROR, GET_DATA_SUCCESS, RELOAD_DATA } from "../constanst";
import { Data, GetDataAction, GetDataState } from "../models";


export const initData: Data = {
  connectionName: '',
  connectionPassword: '',
  connectionUrl: '',
  description: '',
  domainName: '',
  id: '',
  userListFilter: '',
  userSearchBase: '',
  userSearchFilter: '',
  usernameAttribute: '',
}
const initState: GetDataState = {
  loading: false,
  rows: [] as typeof initData[],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};
export const getState = (state = initState, { type, payload, error, params }: GetDataAction): GetDataState => {
  switch (type) {
    case GET_DATA: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_DATA_SUCCESS: {
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

    case GET_DATA_ERROR: {
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
