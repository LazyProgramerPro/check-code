import { GET_CACHING, GET_CACHING_ERROR, GET_CACHING_SUCCESS, RELOAD_DATA } from "../constants";
import { GetCachingAction, GetCachingParams } from "../models";

export const getCaching = (params: GetCachingParams): GetCachingAction => {
  return {
    type: GET_CACHING,
    params: params,
  };
};
export const getCachingSuccess = (resp: any):GetCachingAction => {
  return {
    type: GET_CACHING_SUCCESS,
    payload: resp,
  };
};

export const getCachingErrors = (error: GetCachingAction['error']): GetCachingAction => {
  return {
    type: GET_CACHING_ERROR,
    error: error,
  };
};
export const reloadData = (): GetCachingAction => {
  return {
    type: RELOAD_DATA,
  };
};
