import {
  CLICK_DELETE_BUTTON,
  DELETE_DATA_SERVICE,
  DELETE_DATA_SERVICE_ERROR,
  DELETE_DATA_SERVICE_SUCCESS,
  RELOAD_DATA_DATA_SERVICE,
} from 'src/modules/ManagerDataServiceList/redux/constant';
import { DeleteDataServiceAction, DeleteDataServiceParam } from '../models';

export const deleteDataService = (param?: DeleteDataServiceParam) => {
  return {
    type: DELETE_DATA_SERVICE,
    param: param,
  };
};

export const deleteDataServiceSuccess = () => {
  return {
    type: DELETE_DATA_SERVICE_SUCCESS,
  };
};

export const deleteDataServiceError = (error: DeleteDataServiceAction['error']) => {
  return {
    type: DELETE_DATA_SERVICE_ERROR,
    error: error,
  };
};

export const reloadData = (): DeleteDataServiceAction => {
  return {
    type: RELOAD_DATA_DATA_SERVICE,
  };
};
