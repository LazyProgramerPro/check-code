import {
  CHANGE_STATUS_API,
  GET_GROUP_API_DETAIL,
  GET_GROUP_API_DETAIL_ERROR,
  GET_GROUP_API_DETAIL_SUCCESS
} from './../constants';
import { IGroupApiDetailState } from './../models';

const initState: IGroupApiDetailState = {
  loading: false,
  data: null,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

const groupApiDetailReducer = (state = initState, { type, payload, status, error }: any): IGroupApiDetailState => {
  switch (type) {

    case CHANGE_STATUS_API:
      return {
        ...state,
        data: {
          ...state.data,
          status: status,
          id: state.data?.id || '',
          uuid : state.data?.uuid || '',
          name : state.data?.name || '',
          description : state.data?.description || '',
          context : state.data?.context || '',
          version : state.data?.version || '',
          endpointUrl : state.data?.endpointUrl || '',
          production_endpoint_url : state.data?.production_endpoint_url || '',
          sandbox_endpoint_url : state.data?.sandbox_endpoint_url || '',
          active : state.data?.active || '',
          create_by : state.data?.create_by || '',
          date : state.data?.date || 0,
          file : state.data?.file || '',
          type : state.data?.type || '',
          defaultVersion : state.data?.defaultVersion || false,
          policies : state.data?.policies || [],
          transport : state.data?.transport || [],
          categories : state.data?.categories || [],
          reason : state.data?.reason || '',
          myId : state.data?.myId || '',
          loading: state.data?.loading || false,
          create_at: state.data?.create_at || 0
        }
      }

    case GET_GROUP_API_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case GET_GROUP_API_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case GET_GROUP_API_DETAIL_ERROR:
      return {
        ...state,
        error,
        loading: false,
        data: null,
      };

    default:
      return state;
  }
};

export default groupApiDetailReducer;
