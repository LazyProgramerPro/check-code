import {GetGroupRestApiAction} from "../models";
import {GET_GROUP_REST_API, GET_GROUP_REST_API_ERROR, GET_GROUP_REST_API_SUCCESS} from "../constants";

export const getGroupRestApi = (param: string) : GetGroupRestApiAction =>{
  return {
    type: GET_GROUP_REST_API,
    groupId: param
  }
}

export const getGroupRestApiSuccess = (resp: any): GetGroupRestApiAction => {
  return {
    type: GET_GROUP_REST_API_SUCCESS,
    payload: resp
  }
}

export const getGroupRestApiError = (error: GetGroupRestApiAction['error']): GetGroupRestApiAction => {
  return{
    type: GET_GROUP_REST_API_ERROR,
    error: error
  }
}
