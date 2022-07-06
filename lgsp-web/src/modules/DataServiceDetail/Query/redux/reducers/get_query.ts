import {GetQueryAction, GetQueryState} from "../models";
import {GET_ALL_QUERY, GET_ALL_QUERY_ERROR, GET_ALL_QUERY_SUCCESS, RELOAD_DATA_QUERY} from "../constants";


const initState: GetQueryState ={
  loading: false,
  total: 0,
  rows: [],
  error: undefined,
  flag_reload: false,
  params: undefined
}

export default (state=initState, {type, params, payload, error}: GetQueryAction): GetQueryState => {
  switch (type){
    case GET_ALL_QUERY:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params
        }
      }

    case GET_ALL_QUERY_SUCCESS:
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

    case GET_ALL_QUERY_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    case RELOAD_DATA_QUERY:
      return {
        ...state,
        flag_reload: !state.flag_reload
      }
    default:
      return state;
  }
}
