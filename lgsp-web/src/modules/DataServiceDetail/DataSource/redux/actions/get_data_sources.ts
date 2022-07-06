import {GetDataSourceAction, GetDataSourceParams} from "../models";
import {
  GET_ALL_DATA_SOURCE,
  GET_ALL_DATA_SOURCE_ERROR,
  GET_ALL_DATA_SOURCE_SUCCESS,
  RELOAD_DATA_DATA_SOURCE
} from "../constants";

export const getAllDataSource = (params: GetDataSourceParams) : GetDataSourceAction =>{
  return {
    type: GET_ALL_DATA_SOURCE,
    params: params
  }
}

export const getAllDataSourceSuccess = (resp: any): GetDataSourceAction => {
  return {
    type: GET_ALL_DATA_SOURCE_SUCCESS,
    payload: resp
  }
}

export const getAllDataSourceError = (error: GetDataSourceAction['error']): GetDataSourceAction => {
  return{
    type: GET_ALL_DATA_SOURCE_ERROR,
    error: error
  }
}

export const reloadData = (): GetDataSourceAction => {
  return {
    type: RELOAD_DATA_DATA_SOURCE
  }
}
