import {GET_QUERY_DETAIL, GET_QUERY_DETAIL_ERROR, GET_QUERY_DETAIL_SUCCESS, SHOW_QUERY_DETAIL} from "../constants";
import {GetQueryDetailAction, GetQueryDetailState} from "../models";


const initState: GetQueryDetailState = {
  loading: false,
  queryId: "",
  data: undefined,
  error: undefined,
  flag_reload: false,
}

export default (state=initState, {show,type, queryId, payload, error}: GetQueryDetailAction): GetQueryDetailState => {
  switch (type){
    case SHOW_QUERY_DETAIL:
      return {
        ...state,
        show: show,
        queryId: queryId,
      }

    case GET_QUERY_DETAIL:
      return {
        ...state,
        loading: true,
        queryId: queryId
      }

    case GET_QUERY_DETAIL_SUCCESS:
      return {
        ...state,
        loading:false,
        data: payload?.item,
      }

    case GET_QUERY_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
