import {GET_SINGLE_DATA_SOURCE, GET_SINGLE_DATA_SOURCE_ERROR, GET_SINGLE_DATA_SOURCE_SUCCESS} from "../constants";
import {GetSingleDataSourceAction, GetSingleDataSourceState} from "../models";


const initState: GetSingleDataSourceState = {
  loading: false,
  dataSourceId: "",
  data: undefined,
  error: undefined,
  flag_reload: false,
}

export default (state=initState, {type, dataSourceId, payload, error}: GetSingleDataSourceAction): GetSingleDataSourceState => {
  switch (type){
    case GET_SINGLE_DATA_SOURCE:
      return {
        ...state,
        loading: true,
        dataSourceId: dataSourceId
      }

    case GET_SINGLE_DATA_SOURCE_SUCCESS:
      return {
        ...state,
        loading:false,
        data: payload?.item,
      }

    case GET_SINGLE_DATA_SOURCE_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
