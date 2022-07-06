import { GET_TEST, GET_TEST_ERROR, GET_TEST_SUCCESS, RELOAD_DATA_TEST } from '../constanst';
import { GetTestAction, GetTestParams } from '../models';

export const getTest = (params: GetTestParams): GetTestAction => {
  console.log('actions');
  return {
    type: GET_TEST,
    params: params,
  };
};

export const getTestSuccess = (resp: any): GetTestAction => {
  return {
    type: GET_TEST_SUCCESS,
    payload: resp,
  };
};

export const getTestErrors = (error: GetTestAction['error']): GetTestAction => {
  return {
    type: GET_TEST_ERROR,
    error: error,
  };
};

export const reloadData = (): GetTestAction => {
  return {
    type: RELOAD_DATA_TEST,
  };
};
