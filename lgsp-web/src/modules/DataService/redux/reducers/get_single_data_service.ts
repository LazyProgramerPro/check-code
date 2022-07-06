import {GetSingleDataServiceAction, GetSingleDataServiceState} from "../models";
import {
  GET_SINGLE_DATA_SERVICE,
  GET_SINGLE_DATA_SERVICE_ERROR,
  GET_SINGLE_DATA_SERVICE_SUCCESS
} from "../constants";

const initState: GetSingleDataServiceState = {
  loading: false,
  dataServiceId: "",
  data: undefined,
  error: undefined,
  flag_reload: false,
}

export default (state=initState, {type, dataServiceId, payload, error}: GetSingleDataServiceAction): GetSingleDataServiceState => {
  switch (type){
    case GET_SINGLE_DATA_SERVICE:
      return {
        ...state,
        loading: true,
        dataServiceId: dataServiceId
      }

    case GET_SINGLE_DATA_SERVICE_SUCCESS:
      return {
        ...state,
        loading:false,
        data: payload?.item,
      }

    case GET_SINGLE_DATA_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
