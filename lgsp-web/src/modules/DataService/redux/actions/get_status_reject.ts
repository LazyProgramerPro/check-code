import { AppError } from 'src/models/baseResponse';
import { string } from 'yup/lib/locale';
import {
  LOGIC_REJECT,
  REQUEST_REJECT,
  REQUEST_REJECT_ERROR,
  REQUEST_REJECT_SUCCESS,
  SHOW_REQUEST_REJECT_FORM,
} from '../constants';
import { RejectAction, RejectParams } from '../models';

export const showRequestServiceFrom = (show: boolean, params?: RejectParams): RejectAction => {
  return {
    type: SHOW_REQUEST_REJECT_FORM,
    show: show,
    originId: params?.requestId,
  };
};

export const requestService = (params: RejectParams): RejectAction => {
  return {
    type: REQUEST_REJECT,
    params: params,
  };
};

export const requestServiceSuccess = (): RejectAction => {
  return {
    type: REQUEST_REJECT_SUCCESS,
  };
};

export const logicData = (id: string): RejectAction => {
  return {
    type: LOGIC_REJECT,
    originId: id,
  };
};
export const requestServiceError = (error: AppError): RejectAction => {
  return {
    type: REQUEST_REJECT_ERROR,
    error: error,
  };
};
