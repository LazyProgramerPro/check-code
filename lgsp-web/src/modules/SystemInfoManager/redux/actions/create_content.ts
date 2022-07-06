import { CREATE_CONTENT, CREATE_CONTENT_ERROR, CREATE_CONTENT_SUCCESS, SHOW_CREATE } from '../constants';
import { CreateContentAction, CreateContentParams } from '../models';

export const showCreateContentForm = (show: boolean): CreateContentAction => {
  return {
    type: SHOW_CREATE,
    show: show,
  };
};

export const createContent = (params: CreateContentParams, history?: any): CreateContentAction => {
  return {
    type: CREATE_CONTENT,
    params: params,
    history: history,
  };
};

export const createContentSuccess = () => {
  return {
    type: CREATE_CONTENT_SUCCESS,
  };
};

export const createContentError = (error: CreateContentAction['error']): CreateContentAction => {
  return {
    type: CREATE_CONTENT_ERROR,
    error: error,
  };
};
