import {ShowModalAction, ShowModalState} from "../models";
import {SHOW_UPDATE_PARAMETER_FORM, SHOW_UPDATE_RESPONSE_FORM} from "../constants";

const initState: ShowModalState = {
  showParam: false,
  showResponse: false,
  responseData: undefined,
  paramData: undefined
}

export default (state = initState, {type, showParam, showResponse, paramData, responseData}:ShowModalAction): ShowModalState => {
  switch (type){

    case SHOW_UPDATE_PARAMETER_FORM:
      if(paramData === undefined){
        return {
          ...state,
          showParam: showParam
        }
      }else {
        return {
          ...state,
          showParam: showParam,
          paramData: paramData
        }
      }

    case SHOW_UPDATE_RESPONSE_FORM:
      if(responseData === undefined){
        return {
          ...state,
          showResponse: showResponse
        }
      }else {
        return {
          ...state,
          showResponse: showResponse,
          responseData: responseData
        }
      }
    default:
      return state;
  }
}
