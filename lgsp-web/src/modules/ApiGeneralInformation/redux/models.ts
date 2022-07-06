import {AppError, ItemResponseBase} from "../../../models/baseResponse";

export interface ApiGeneralInformationEntity {
  description: string,
  categories: string [],
  deploymentUnit: string,
  isPublic: boolean,
  permissions: string[],
  lastUpdate: string,
}

export interface GetApiGeneralInformationAction {
  type: string,
  apiId?: string,
  payload?: ItemResponseBase<ApiGeneralInformationEntity>,
  error?: AppError,
}

export interface GetApiGeneralInformationState {
  loading: boolean,
  apiId?: string,
  error?: AppError,
  item: ApiGeneralInformationEntity,
  flag_reload: boolean
}

export interface UpdateApiGeneralInformationParam {
  apiId: string,
  description: string,
  categories: string[],
  deploymentUnit: string,
  isPublic: boolean,
  permissions: string[],
}

export interface UpdateApiGeneralInformationAction {
  type: string,
  params?: UpdateApiGeneralInformationParam,
  error?: AppError,
}

export interface UpdateApiGeneralInformationState {
  loading: boolean,
  params?: UpdateApiGeneralInformationParam,
  error?: AppError
}








//
