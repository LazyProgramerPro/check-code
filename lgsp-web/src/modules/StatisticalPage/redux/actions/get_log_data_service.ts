import {
  LOG_DATA_SERVICE,
  LOG_DATA_SERVICE_SUCCESS,
  LOG_DATA_SERVICE_ERROR,
  RELOAD_LOG_DATA_SERVICE,
} from '../constants';
import { GetDataServiceParams, GetDataServiceAction } from '../models';
export const getLogDataService = (params: GetDataServiceParams): GetDataServiceAction => {
  return {
    type: LOG_DATA_SERVICE,
    params: params,
  };
};
export const getLogDataServiceSuccess = (resp: any): GetDataServiceAction => {
  return {
    type: LOG_DATA_SERVICE_SUCCESS,
    payload: resp,
  };
};

export const getLogDataServiceErrors = (error: GetDataServiceAction['error']): GetDataServiceAction => {
  return {
    type: LOG_DATA_SERVICE_ERROR,
    error: error,
  };
};

export const reloadData = (): GetDataServiceAction => {
  return {
    type: RELOAD_LOG_DATA_SERVICE,
  };
};
