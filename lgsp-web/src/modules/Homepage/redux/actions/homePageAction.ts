import {GET_CONTENT_HOME_PAGE, GET_CONTENT_HOME_PAGE_ERROR, GET_CONTENT_HOME_PAGE_SUCESS} from '../constants';
import {IHomePageAction, IHomePageParams, IHomePagePayload} from '../models';

export const getContentHomePage = (params: IHomePageParams): IHomePageAction => {
  return {
    type: GET_CONTENT_HOME_PAGE,
    params: params
  }
}

export const getContentHomePageSuccess = (resp: IHomePagePayload): IHomePageAction => {
  return {
    type: GET_CONTENT_HOME_PAGE_SUCESS,
    payload: resp
  }
};

export const getContentHomePageError = (error: IHomePageAction['error']): IHomePageAction => {
  return {
    type: GET_CONTENT_HOME_PAGE_ERROR,
    error: error
  }
};
