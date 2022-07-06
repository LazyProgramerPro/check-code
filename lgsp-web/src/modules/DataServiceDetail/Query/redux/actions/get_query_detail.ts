import {GetQueryDetailAction} from "../models";
import {GET_QUERY_DETAIL, GET_QUERY_DETAIL_ERROR, GET_QUERY_DETAIL_SUCCESS, SHOW_QUERY_DETAIL} from "../constants";


export const showQueryDetail = (show: boolean, queryId?: string) : GetQueryDetailAction =>{
  return {
    type: SHOW_QUERY_DETAIL,
    show: show,
    queryId: queryId
  }
}


export const getQueryDetail = (param: string) : GetQueryDetailAction =>{
  return {
    type: GET_QUERY_DETAIL,
    queryId: param
  }
}

export const getQueryDetailSuccess = (resp: any): GetQueryDetailAction => {
  return {
    type: GET_QUERY_DETAIL_SUCCESS,
    payload: resp
  }
}

export const getQueryDetailError = (error: GetQueryDetailAction['error']): GetQueryDetailAction => {
  return{
    type: GET_QUERY_DETAIL_ERROR,
    error: error
  }
}
