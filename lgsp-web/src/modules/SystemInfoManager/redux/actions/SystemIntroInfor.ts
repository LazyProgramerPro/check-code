import { SET_ROW_EDITTING, CREATE_SYSTEM_INTRO_INFOR, CREATE_SYSTEM_INTRO_INFOR_SUCCESS, CREATE_SYSTEM_INTRO_INFOR_ERROR, UPDATE_SYSTEM_INTRO_INFOR, UPDATE_SYSTEM_INTRO_INFOR_SUCCESS, UPDATE_SYSTEM_INTRO_INFOR_ERROR, RELOAD_SYSTEM_INTRO_INFOR, UPDATE_SLIDER_INFOR, UPDATE_SLIDER_INFOR_SUCCESS, UPDATE_SLIDER_INFOR_ERROR, PUBLISH_INTRO_INFOR, PUBLISH_INTRO_INFOR_SUCCESS, PUBLISH_INTRO_INFOR_ERROR, UPDATE_ADDRESS_INFOR, UPDATE_ADDRESS_INFOR_SUCCESS, UPDATE_ADDRESS_INFOR_ERROR, DELETE_INTRO_INFOR, DELETE_INTRO_INFOR_SUCCESS, DELETE_INTRO_INFOR_ERROR } from './../constants';
import { ListResponseBase } from 'src/models/baseResponse';
import { AppError } from '../../../../models/common';
import { FETCH_SYSTEM_INTRO_INFOR, FETCH_SYSTEM_INTRO_INFOR_SUCCESS, FETCH_SYSTEM_INTRO_INFOR_ERROR } from '../constants';
import { ISystemIntroInforAction, ISystemIntroInforEntity, ISystemIntroInforParams } from '../models';
export const getSystemIntroInfor = (params: ISystemIntroInforParams) => {
  return {
    type: FETCH_SYSTEM_INTRO_INFOR,
    params: params
  }
}

export const getSystemIntroInforSuccess = (payload: ListResponseBase<ISystemIntroInforEntity>): ISystemIntroInforAction => {
  return {
    type: FETCH_SYSTEM_INTRO_INFOR_SUCCESS,
    payload: payload
  }
}

export const getSystemIntroInforError = (error: AppError): ISystemIntroInforAction => {
  return {
    type: FETCH_SYSTEM_INTRO_INFOR_ERROR,
    error: error
  }
}

export const createSystemIntroInfor = (payload: Partial<ISystemIntroInforEntity>) : ISystemIntroInforAction => {
  return {
    type: CREATE_SYSTEM_INTRO_INFOR,
    payload: payload
  }
}

export const createSystemIntroInforSuccess = (): ISystemIntroInforAction => {
  return {
    type: CREATE_SYSTEM_INTRO_INFOR_SUCCESS
  }
}

export const createSystemIntroInforError = (error: AppError): ISystemIntroInforAction => {
  return {
    type: CREATE_SYSTEM_INTRO_INFOR_ERROR,
    error: error
  }
}


export const publishIntroInfor = (payload: Partial<ISystemIntroInforEntity>) : ISystemIntroInforAction => {
  return {
    type: PUBLISH_INTRO_INFOR,
    payload: payload
  }
}

export const publishIntroInforSuccess = (): ISystemIntroInforAction => {
  return {
    type: PUBLISH_INTRO_INFOR_SUCCESS
  }
}

export const publishIntroInforError = (error: AppError): ISystemIntroInforAction => {
  return {
    type: PUBLISH_INTRO_INFOR_ERROR,
    error: error
  }
}

export const updateSystemIntroInfor = (payload: Partial<ISystemIntroInforEntity>) : ISystemIntroInforAction => {
  return {
    type: UPDATE_SYSTEM_INTRO_INFOR,
    payload: payload
  }
}

export const updateSystemIntroInforSuccess = (payload: Partial<ISystemIntroInforEntity>): ISystemIntroInforAction => {
  return {
    type: UPDATE_SYSTEM_INTRO_INFOR_SUCCESS,
    payload: payload
  }
}

export const updateSystemIntroInforError = (error: AppError): ISystemIntroInforAction => {
  return {
    type: UPDATE_SYSTEM_INTRO_INFOR_ERROR,
    error: error
  }
}

export const updateSliderInfor = (payload: Partial<ISystemIntroInforEntity>) : ISystemIntroInforAction => {
  return {
    type: UPDATE_SLIDER_INFOR,
    payload: payload
  }
}

export const updateSliderInforSuccess = (payload: Partial<ISystemIntroInforEntity>): ISystemIntroInforAction => {
  return {
    type: UPDATE_SLIDER_INFOR_SUCCESS,
    payload: payload
  }
}

export const updateSliderInforError = (error: AppError): ISystemIntroInforAction => {
  return {
    type: UPDATE_SLIDER_INFOR_ERROR,
    error: error
  }
}

export const updateAddressInfor = (payload: Partial<ISystemIntroInforEntity>) : ISystemIntroInforAction => {
  return {
    type: UPDATE_ADDRESS_INFOR,
    payload: payload
  }
}

export const updateAddressInforSuccess = (payload: Partial<ISystemIntroInforEntity>): ISystemIntroInforAction => {
  return {
    type: UPDATE_ADDRESS_INFOR_SUCCESS,
    payload: payload
  }
}

export const updateAddressInforError = (error: AppError): ISystemIntroInforAction => {
  return {
    type: UPDATE_ADDRESS_INFOR_ERROR,
    error: error
  }
}

export const deleteIntroInfor = (payload: Partial<ISystemIntroInforEntity>) : ISystemIntroInforAction => {
  return {
    type: DELETE_INTRO_INFOR,
    payload: payload
  }
}

export const deleteIntroInforSuccess = (payload: Partial<ISystemIntroInforEntity>): ISystemIntroInforAction => {
  return {
    type: DELETE_INTRO_INFOR_SUCCESS,
    payload: payload
  }
}

export const deleteIntroInforError = (error: AppError): ISystemIntroInforAction => {
  return {
    type: DELETE_INTRO_INFOR_ERROR,
    error: error
  }
}

export const setRowEditting = ( rowData: ISystemIntroInforEntity | null):ISystemIntroInforAction => {
  return {
    type: SET_ROW_EDITTING,
    rowEditting: rowData
  }
}

export const reloadData = ():ISystemIntroInforAction => {
  return {
    type: RELOAD_SYSTEM_INTRO_INFOR
  }
}
