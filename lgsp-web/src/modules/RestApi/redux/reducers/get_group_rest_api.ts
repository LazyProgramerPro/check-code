import {GetGroupRestApiAction, IGroupApiState, GetRestApiAction} from "../models";
import {GET_GROUP_REST_API, GET_GROUP_REST_API_ERROR, GET_GROUP_REST_API_SUCCESS} from "../constants";

const initState: IGroupApiState ={
  loading: false,
  groupId: "",
  data: undefined,
  error: undefined,
  flag_reload: false,
}

export default (state=initState, {type, groupId, payload, error}: GetGroupRestApiAction): IGroupApiState => {
  switch (type){
    case GET_GROUP_REST_API:
      return {
        ...state,
        loading: true,
        groupId: groupId
      }

    case GET_GROUP_REST_API_SUCCESS:
      return {
        ...state,
        loading:false,
        data: payload?.item,
      }

    case GET_GROUP_REST_API_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
