import { AppError, EHttpMethod } from 'src/models/common';
import { IGroupApiDetailState, IGroupApiDetailAction } from './../../GroupApiDetail/redux/models';

export type IGroupApiResourcesAction = IGroupApiDetailAction;

export interface IParamObject {
  id?:string,
  in: string,
  description?: string
  name: string,
  required: boolean,
  type: string
}

export interface IResponseObject {
  id?: string,
  code: number | undefined,
  description: string
}

export interface IApiEndpointEntity {
  type: EHttpMethod,
  responses: IResponseObject[],
  params: IParamObject[],
  description?: string,
}
export interface IResourceList {
  path: string,
  data: IApiEndpointEntity[],
}
export interface IGroupApiResourceObject {
  apiId : string,
  policy: string,
  lastUpdate: string,
  apiLevel: boolean,
  resourceList: IResourceList []
}

export interface IGroupApiResourcesState {
  loading?: boolean,
  error?: AppError,
  data: IGroupApiResourceObject | null,
  flag_reload?: boolean,
};
