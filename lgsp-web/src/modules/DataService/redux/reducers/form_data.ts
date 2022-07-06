import {GetDataServiceAction, IFormDataService} from "../models";
import {
  SET_FORM_DATA_SERVICE,
  GET_ALL_DATA_SERVICE_ERROR,
  GET_ALL_DATA_SERVICE_SUCCESS,
  RELOAD_DATA_DATA_SERVICE
} from "../constants";

const initState: IFormDataService = {
  loading: false,
  isOpen: false,
  isEdit: false,
  taskEditting: null,
  error: ''
};

const dataFormReducer = (state = initState, {type, payload, error, params}: GetDataServiceAction): IFormDataService => {
  switch (type) {
    case SET_FORM_DATA_SERVICE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export default dataFormReducer;
