import { DELETE_GROUP_API_SUCCESS, DELETE_GROUP_API_ERROR, DELETE_GROUP_REST_API } from '../constants';
import { IRestApiObject } from '../models';
import {
  CREATE_GROUP_REST_API,
  CREATE_GROUP_REST_API_SUCCESS,
  CREATE_GROUP_REST_API_ERROR,
  CREATE_WSDL_FILE_API,
  CREATE_WSDL_FILE_API_SUCCESS,
  CREATE_WSDL_FILE_API_ERROR,
  SET_ROW_EDITTING,
} from '../constants';
import { CREATE_REST_API, CREATE_REST_API_SUCCESS, CREATE_REST_API_ERROR } from '../../../RestApi/redux/constants';
import { GetGroupRestApiAction, IGroupApiState } from '../models';
import {
  GET_ALL_GROUP_REST_API,
  GET_ALL_GROUP_REST_API_ERROR,
  GET_ALL_GROUP_REST_API_SUCCESS,
  RELOAD_DATA_GROUP_REST_API,
} from '../constants';

const initState: IGroupApiState = {
  loading: false,
  data: [],
  total: 0,
  rowEditting: null,
  flag_reload: false,
  params: undefined,
  error: undefined,
  rows: [],
};

const groupRestApiReducer = (state = initState, { type, payload, error, params, rowEditting }: any): IGroupApiState => {
  switch (type) {
    case GET_ALL_GROUP_REST_API:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };

    case GET_ALL_GROUP_REST_API_SUCCESS:
      return {
        ...state,
        loading: false,
        rows: payload?.rows || [],
        total: payload?.total || 0,
      };

    case GET_ALL_GROUP_REST_API_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };

    //CREATE
    case CREATE_GROUP_REST_API_SUCCESS:
    case CREATE_WSDL_FILE_API_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_GROUP_REST_API_ERROR:
    case CREATE_WSDL_FILE_API_ERROR:

    case DELETE_GROUP_API_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };

    case DELETE_GROUP_API_SUCCESS:
      const cloneListData = JSON.parse(JSON.stringify(state.data)) || [];
      const newDataAfterRemove = cloneListData.filter((row: Partial<IRestApiObject>) => row?.id !== payload?.id);
      return {
        ...state,
        total: state.total - 1,
        data: [...newDataAfterRemove],
      };

    case RELOAD_DATA_GROUP_REST_API:
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };

    case SET_ROW_EDITTING:
      return {
        ...state,
        rowEditting: rowEditting,
      };

    default:
      return state;
  }
};

export default groupRestApiReducer;
