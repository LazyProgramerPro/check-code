import {GetApiGeneralInformationAction, GetApiGeneralInformationState} from "../models";
import {
  GET_API_GENERAL_INFORMATION,
  GET_API_GENERAL_INFORMATION_ERROR,
  GET_API_GENERAL_INFORMATION_SUCCESS, RELOAD_API_GENERAL_INFORMATION
} from "../constants";

const initState: GetApiGeneralInformationState = {
  loading: false,
  item: {
    categories: [],
    deploymentUnit: '',
    description: '',
    isPublic: true,
    permissions: [],
    lastUpdate: ''
  },
  error: undefined,
  flag_reload: false,
  apiId: ''
}

export default (state = initState, {type, apiId, payload, error}: GetApiGeneralInformationAction) : GetApiGeneralInformationState => {
  switch (type) {
    case GET_API_GENERAL_INFORMATION:
      return {
        ...state,
        loading: true,
        apiId: apiId
      }

    case GET_API_GENERAL_INFORMATION_SUCCESS:
      if(payload?.item !== undefined){
        return {
          ...state,
          loading: false,
          item: payload?.item
        }
      }else {
        return {
          ...state,
          loading: false
        }
      }

    case GET_API_GENERAL_INFORMATION_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    case RELOAD_API_GENERAL_INFORMATION:
      return {
        ...state,
        flag_reload: !state.flag_reload
      }

    default:
      return state;
  }
}
