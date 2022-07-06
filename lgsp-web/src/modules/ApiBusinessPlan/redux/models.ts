import { AppError, ItemResponseBase, ListResponseBase } from '../../../models/baseResponse';

export interface ApiPolicyEntity {
  policies: string[];
  lastUpdate: string;
}

export interface GetApiPolicyAction {
  type: string;
  apiId?: string;
  policies?: string[];
  payload?: ItemResponseBase<ApiPolicyEntity>;
  error?: AppError;
}

export interface GetApiPolicyState {
  loading: boolean;
  apiId?: string;
  error?: AppError;
  item: ApiPolicyEntity;
  flag_reload: boolean;
}

export interface UpdateApiPolicyParam {
  apiId: string;
  policies: string[];
}

// export interface UpdateApiPolicyParam {
//   apiId: string,
//   description: string,
//   categories: string[],
//   department: string,
//   isPublic: boolean
// }

export interface UpdateApiPolicyAction {
  type: string;
  params?: UpdateApiPolicyParam;
  error?: AppError;
}

export interface UpdateApiPolicyState {
  loading: boolean;
  params?: UpdateApiPolicyParam;
  error?: AppError;
}

export interface GetApiSubscriptionUserEntity {
  userId: string;
  username: string;
  policy: string;
  status: string;
}

export interface GetApiSubscriptionUserParam {
  apiId: string;
  text?: string;
  page?: number;
  size?: number;
}

export interface GetApiSubscriptionUserAction {
  type: string;
  params?: GetApiSubscriptionUserParam;
  payload?: ListResponseBase<GetApiSubscriptionUserEntity>;
  error?: AppError;
}

export interface GetApiSubscriptionUserState {
  loading: boolean;
  params?: GetApiSubscriptionUserParam;
  error?: AppError;
  rows: GetApiSubscriptionUserEntity[];
  total?: number;
  flag_reload: boolean;
}

export interface UpdateApiStatusSubscriptionParam {
  apiId: string;
  username: string;
}

export interface UpdateApiPolicySubscriptionParam {
  apiId: string;
  username: string;
  policy: string;
}

export interface UpdateApiPolicySubscriptionAction {
  type: string;
  show?: boolean;
  params?: UpdateApiPolicySubscriptionParam;
  error?: AppError;
}

export interface UpdateApiPolicySubscriptionState {
  loading: boolean;
  show?: boolean;
  params?: UpdateApiPolicySubscriptionParam;
  error?: AppError;
}
