
import {GetDataSourceAction, GetDataSourceState} from "../models";
import {
  GET_ALL_DATA_SOURCE,
  GET_ALL_DATA_SOURCE_ERROR,
  GET_ALL_DATA_SOURCE_SUCCESS,
  RELOAD_DATA_DATA_SOURCE
} from "../constants";

const initState: GetDataSourceState ={
  loading: false,
  total: 0,
  rows: [],
  error: undefined,
  flag_reload: false,
  params: undefined
}

export default (state=initState, {type, params, payload, error}: GetDataSourceAction): GetDataSourceState => {
  switch (type){
    case GET_ALL_DATA_SOURCE:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params
        }
      }

    case GET_ALL_DATA_SOURCE_SUCCESS:
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

    case GET_ALL_DATA_SOURCE_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    case RELOAD_DATA_DATA_SOURCE:
      return {
        ...state,
        flag_reload: !state.flag_reload
      }
    default:
      return state;
  }
}
