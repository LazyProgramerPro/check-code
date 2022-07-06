import {AppError, ItemResponseBase, ListResponseBase} from "src/models/baseResponse";
import { IRestApiObject } from "src/modules/GroupApi/redux/models";


export interface RestApiEntity{
  id: string;
  uuid: string;
  path: string;
  policy: string;
}


export interface GetRestApiParams{
  text?: string;
  type?: string;
  groupId?: string;
  page?: number;
  size?: number;
}

export interface GetRestApiAction{
  type: string,
  params?: GetRestApiParams,
  payload?: ListResponseBase<RestApiEntity>
  error?: AppError,
}

export interface GetRestApiState{
  loading: boolean,
  params?: GetRestApiParams,
  error?: AppError,
  total: number,
  rows: RestApiEntity[],
  flag_reload: boolean
}


export interface GetGroupRestApiAction{
  type: string,
  groupId?: string,
  payload?: ItemResponseBase<IRestApiObject>
  error?: AppError,
}

export interface IGroupApiState{
  loading: boolean,
  groupId?: string,
  error?: AppError,
  data?: IRestApiObject,
  flag_reload: boolean
}



