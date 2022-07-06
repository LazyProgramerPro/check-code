import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import {GET_GROUP_API_DETAIL_SUCCESS, GET_GROUP_API_DETAIL_ERROR, CHANGE_STATUS_API} from './../constants';
import { GET_GROUP_API_DETAIL } from '../constants';
import { IGroupApiDetailAction } from '../models';

export const changeStatusApi = (status: string): IGroupApiDetailAction => {
  return {
    type: CHANGE_STATUS_API,
    status: status,
  };
}

export const getGroupApiDetail = (groupId: string):IGroupApiDetailAction => {
  return {
    type: GET_GROUP_API_DETAIL,
    groupId
  }
}

export const getGroupApiDetailSuccess = (payload: IRestApiObject):IGroupApiDetailAction => {
  return {
    type: GET_GROUP_API_DETAIL_SUCCESS,
    payload
  }
}

export const getGroupApiDetailError = (error: IGroupApiDetailAction['error']):IGroupApiDetailAction => {
  return {
    type: GET_GROUP_API_DETAIL_ERROR,
    error
  }
}


