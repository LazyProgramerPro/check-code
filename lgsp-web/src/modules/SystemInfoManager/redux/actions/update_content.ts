import { AppError } from 'src/models/common';
import { SHOW_DATA, UPDATE_CONTENT, UPDATE_CONTENT_ERROR, UPDATE_CONTENT_SUCCESS } from '../constants';
import { CreateContentAction, DataSystemInfo, UpdateContentAction, UpdateContentParam } from '../models';

export const showData = (show: boolean, data?: DataSystemInfo): UpdateContentAction => {

  if (data === undefined) {
    return {
      type: SHOW_DATA,
      show: show,
    };
  }
  return {
    type: SHOW_DATA,
    show: show,
    originData: data,
  };
};

export const updateContent = (params: UpdateContentParam): UpdateContentAction => {
  return {
    type: UPDATE_CONTENT,
    params: params,
  };
};

export const updateContentSuccess = (): CreateContentAction => {
  return {
    type: UPDATE_CONTENT_SUCCESS,
  };
};

export const updateContentError = (error: AppError): UpdateContentAction => {
  return {
    type: UPDATE_CONTENT_ERROR,
    error: error,
  };
};
