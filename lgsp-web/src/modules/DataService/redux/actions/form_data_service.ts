import {GetFormDataServiceAction, IFormDataService} from "../models";
import {
  SET_FORM_DATA_SERVICE,
} from "../constants";


export const setFormDataService = (payload: IFormDataService): GetFormDataServiceAction =>{
  return{
    type: SET_FORM_DATA_SERVICE,
    payload: payload
  }
}
