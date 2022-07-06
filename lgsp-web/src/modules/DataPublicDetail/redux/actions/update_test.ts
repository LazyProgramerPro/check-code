import { AppError } from 'src/models/common';
import { SHOW_DATA_TEST, UPDATE_TEST, UPDATE_TEST_ERROR, UPDATE_TEST_SUCCESS } from '../constanst';

import { GetTestAction, Test, UpdateTestAction, UpdateTestParam } from '../models';

export const showUpdateTest = (show: boolean, data?: Test): UpdateTestAction => {
  if (data === undefined) {
    return {
      type: SHOW_DATA_TEST,
      show: show,
    };
  }
  return {
    type: SHOW_DATA_TEST,
    show: show,
    originData: data,
  };
};

export const updateTest = (params: UpdateTestParam): UpdateTestAction => {
  return {
    type: UPDATE_TEST,
    params: params,
  };
};

export const updateTestSuccess = (): GetTestAction => {
  return {
    type: UPDATE_TEST_SUCCESS,
  };
};

export const updateTestError = (error: AppError): UpdateTestAction => {
  return {
    type: UPDATE_TEST_ERROR,
    error: error,
  };
};
