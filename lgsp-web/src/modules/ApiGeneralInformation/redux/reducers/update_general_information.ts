import {UpdateApiGeneralInformationAction, UpdateApiGeneralInformationState} from "../models";
import {
  UPDATE_API_GENERAL_INFORMATION,
  UPDATE_API_GENERAL_INFORMATION_ERROR,
  UPDATE_API_GENERAL_INFORMATION_SUCCESS
} from "../constants";

const initState: UpdateApiGeneralInformationState = {
  loading: false,
  error: undefined,
  params: undefined
}

export default (state = initState, {type, params, error}: UpdateApiGeneralInformationAction) : UpdateApiGeneralInformationState => {
  switch (type) {
    case UPDATE_API_GENERAL_INFORMATION:
      return {
        ...state,
        params: params,
        loading: true
      }

    case UPDATE_API_GENERAL_INFORMATION_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case UPDATE_API_GENERAL_INFORMATION_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      }

    default:
      return state;
  }
}
