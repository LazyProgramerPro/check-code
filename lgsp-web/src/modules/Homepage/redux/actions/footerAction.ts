import {GET_CONTENT_FOOTER_PAGE, GET_CONTENT_FOOTER_PAGE_SUCCESS, GET_CONTENT_HOME_PAGE_ERROR} from '../constants';
import {IFooterAction, IFooterParams, IFooterPayload} from '../models';

export const getContentFooterPage = (params: IFooterParams): IFooterAction => {
  return {
    type: GET_CONTENT_FOOTER_PAGE,
    params: params
  }
}

export const getContentFooterPageSuccess = (resp: IFooterPayload): IFooterAction => {
  return {
    type: GET_CONTENT_FOOTER_PAGE_SUCCESS,
    payload: resp
  }
};

export const getContentFooterPageError = (error: IFooterAction['error']): IFooterAction => {
  return {
    type: GET_CONTENT_HOME_PAGE_ERROR,
    error: error
  }
};
