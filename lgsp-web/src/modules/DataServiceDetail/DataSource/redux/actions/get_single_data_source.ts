import {GetSingleDataSourceAction} from "../models";
import {GET_SINGLE_DATA_SOURCE, GET_SINGLE_DATA_SOURCE_ERROR, GET_SINGLE_DATA_SOURCE_SUCCESS} from "../constants";


export const getSingleDataSource = (param: string) : GetSingleDataSourceAction =>{
  return {
    type: GET_SINGLE_DATA_SOURCE,
    dataSourceId: param
  }
}

export const getSingleDataSourceSuccess = (resp: any): GetSingleDataSourceAction => {
  return {
    type: GET_SINGLE_DATA_SOURCE_SUCCESS,
    payload: resp
  }
}

export const getSingleDataSourceError = (error: GetSingleDataSourceAction['error']): GetSingleDataSourceAction => {
  return{
    type: GET_SINGLE_DATA_SOURCE_ERROR,
    error: error
  }
}
