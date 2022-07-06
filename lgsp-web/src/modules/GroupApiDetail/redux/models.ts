import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import { ItemResponseBase, ListResponseBase } from "src/models/baseResponse";
import { AppError, EPolices, ETransport } from "src/models/common";

export enum ELifeCycleStatus {
  PUBLISH = 'PUBLISHED',
  CREATED = 'CREATED'
}


interface IGroupApiDetalParams {

}


export interface IGroupApiDetailAction {
  type: string,
  params?: IGroupApiDetalParams,
  payload?: Partial<IRestApiObject>,
  groupId?: string,
  status?: string
  error?: AppError,
}

export type IGroupApiDetailResponse =  ItemResponseBase<IRestApiObject>;
export interface IGroupApiDetailState {
  loading?: boolean,
  params?: IGroupApiDetalParams,
  error?: AppError,
  data: IRestApiObject | null,
  flag_reload?: boolean,
}
