import {AddParameterToResourceParam, AddResponseToResourceParam, ShowModalAction} from "../models";
import {SHOW_UPDATE_PARAMETER_FORM, SHOW_UPDATE_RESPONSE_FORM} from "../constants";


export const showUpdateParamModal = (show: boolean, paramData?: AddParameterToResourceParam): ShowModalAction => {
  if(paramData === undefined){
    return {
      type: SHOW_UPDATE_PARAMETER_FORM
    }
  }
  return {
    type: SHOW_UPDATE_PARAMETER_FORM,
    paramData: paramData
  }
}

export const showUpdateResponseModal = (show: boolean, responseData?: AddResponseToResourceParam): ShowModalAction => {
  if(responseData === undefined){
    return {
      type: SHOW_UPDATE_RESPONSE_FORM
    }
  }
  return {
    type: SHOW_UPDATE_RESPONSE_FORM,
    responseData: responseData
  }
}
