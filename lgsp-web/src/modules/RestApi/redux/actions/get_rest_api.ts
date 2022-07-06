import {GetRestApiAction, GetRestApiParams} from "../models";
import {GET_ALL_REST_API, GET_ALL_REST_API_ERROR, GET_ALL_REST_API_SUCCESS, RELOAD_DATA_REST_API} from "../constants";

export const getAllRestApi = (params: GetRestApiParams) : GetRestApiAction =>{
  return {
    type: GET_ALL_REST_API,
    params: params
  }
}

export const getAllRestApiSuccess = (resp: any): GetRestApiAction => {
  return {
    type: GET_ALL_REST_API_SUCCESS,
    payload: resp
  }
}

export const getAllRestApiError = (error: GetRestApiAction['error']): GetRestApiAction => {
  return{
    type: GET_ALL_REST_API_ERROR,
    error: error
  }
}

export const reloadData = (): GetRestApiAction => {
  return {
    type: RELOAD_DATA_REST_API
  }
}
