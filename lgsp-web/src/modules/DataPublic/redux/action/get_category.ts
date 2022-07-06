import { GET_CATEGORY, GET_CATEGORY_ERROR, GET_CATEGORY_SUCCESS, RELOAD_DATA_CATEGORY } from '../constant';
import { GetCategoryAction, GetCategoryParams } from '../models';

export const getCategory = (params: GetCategoryParams): GetCategoryAction => {
  return {
    type: GET_CATEGORY,
    params: params,
  };
};

export const getCategorySuccess = (resp: any): GetCategoryAction => {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: resp,
  };
};

export const getCategoryErrors = (error: GetCategoryAction['error']): GetCategoryAction => {
  return {
    type: GET_CATEGORY_ERROR,
    error: error,
  };
};

export const reloadData = (): GetCategoryAction => {
  return {
    type: RELOAD_DATA_CATEGORY,
  };
};
