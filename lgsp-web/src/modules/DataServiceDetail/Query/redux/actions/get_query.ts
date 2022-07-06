import {GetQueryAction, GetQueryParams} from "../models";
import {GET_ALL_QUERY, GET_ALL_QUERY_ERROR, GET_ALL_QUERY_SUCCESS, RELOAD_DATA_QUERY} from "../constants";


export const getAllQuery = (params: GetQueryParams) : GetQueryAction =>{
  return {
    type: GET_ALL_QUERY,
    params: params
  }
}

export const getAllQuerySuccess = (resp: any): GetQueryAction => {
  return {
    type: GET_ALL_QUERY_SUCCESS,
    payload: resp
  }
}

export const getAllQueryError = (error: GetQueryAction['error']): GetQueryAction => {
  return{
    type: GET_ALL_QUERY_ERROR,
    error: error
  }
}

export const reloadData = (): GetQueryAction => {
  return {
    type: RELOAD_DATA_QUERY
  }
}
