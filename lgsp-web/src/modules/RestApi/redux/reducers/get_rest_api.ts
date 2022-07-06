import {GetRestApiAction, GetRestApiState} from "../models";
import {GET_ALL_REST_API, GET_ALL_REST_API_ERROR, GET_ALL_REST_API_SUCCESS, RELOAD_DATA_REST_API} from "../constants";

const initState: GetRestApiState ={
  loading: false,
  total: 0,
  rows: [],
  error: undefined,
  flag_reload: false,
  params: undefined
}

export default (state=initState, {type, params, payload, error}: GetRestApiAction): GetRestApiState => {
  switch (type){
    case GET_ALL_REST_API:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params
        }
      }

    case GET_ALL_REST_API_SUCCESS:
      return {
        ...state,
        loading:false,
        rows: payload?.rows.map((item,index) =>{
          return {
            ...item,
            index
          }
        }) || [],
        total: payload?.total || 0,
      }

    case GET_ALL_REST_API_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    case RELOAD_DATA_REST_API:
      return {
        ...state,
        flag_reload: !state.flag_reload
      }
    default:
      return state;
  }
}
