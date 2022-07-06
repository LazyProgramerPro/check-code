import { CREATE_CACHING, CREATE_CACHING_ERROR, CREATE_CACHING_SUCCESS, SHOW_CREATE } from '../constants';
import { CreateCachingAction, CreateCachingParams } from '../models';

export const showCreateCachingForm = (show: boolean): CreateCachingAction => {
  return {
    type: SHOW_CREATE,
    show: show,
  };
};

export const createCaching = (params: CreateCachingParams): CreateCachingAction => {
  return {
    type: CREATE_CACHING,
    params: params,
  };
};

export const createCachingSuccess = () => {
  return {
    type: CREATE_CACHING_SUCCESS,
  };
};

export const createCachingError = (error: CreateCachingAction['error']): CreateCachingAction => {
  return {
    type: CREATE_CACHING_ERROR,
    error: error,
  };
};
