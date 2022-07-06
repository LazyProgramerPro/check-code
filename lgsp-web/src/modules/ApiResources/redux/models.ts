import { AppError, ItemResponseBase } from '../../../models/baseResponse';
import { EHttpMethod } from '../../../models/common';

export interface ApiResourceConfigEntity {
  apiLevel: boolean;
  policy: string;
  resourceList: ResourceGroup[];
  lastUpdate: string;
}

export interface ResourceGroup {
  path: string;
  data: ApiResourceEntity[];
}

export interface ApiResourceEntity {
  path?: string;
  type: EHttpMethod;
  description?: string;
  policy?: string;
  params: ApiResourceParamEntity[];
  responses: ApiResourceResponseEntity[];
}

export interface ApiResourceParamEntity {
  name: string;
  type: string;
  required: boolean;
  in: string;
}

export interface ApiResourceResponseEntity {
  code: number;
  description: string;
}

export interface GetApiResourceParams {
  apiId?: string;
}

export interface GetApiResourceAction {
  type: string;
  params?: GetApiResourceParams;
  payload?: ItemResponseBase<ApiResourceConfigEntity>;
  error?: AppError;
}

export interface GetApiResourceState {
  loading: boolean;
  params?: GetApiResourceParams;
  error?: AppError;
  item: ApiResourceConfigEntity;
  flag_reload: boolean;
}

export interface UpdateApiResourceParam {
  apiId: string;
  resourceList?: ResourceGroup[];
  apiLevel?: boolean;
  policy?: string;
}

export interface UpdateApiResourceAction {
  type: string;
  params?: UpdateApiResourceParam;
  error?: AppError;
}

export interface UpdateApiResourceState {
  loading: boolean;
  params?: UpdateApiResourceParam;
  error?: AppError;
}

export interface ApiResourceConfigData {
  apiType?: string;
  apiLevel?: boolean;
  policy?: string;
  resourceGroupList: ResourceGroup[];
  lastUpdate?: string;
}
export interface ApiResourceDataAction {
  type: string;
  apiLevel?: boolean;
  policyType?: string;
  addResourceParam?: AddResourceParam;
  deleteResourceParam?: ResourceParam;
  addParameterToResource?: AddParameterToResourceParam;
  updateParameterToResource?: AddParameterToResourceParam;
  deleteParameterFromResource?: DeleteParameterFromResourceParam;
  addResponseToResource?: AddResponseToResourceParam;
  updateResponseToResource?: AddResponseToResourceParam;
  deleteResponseFromResource?: DeleteResponseFromResourceParam;
  changePolicyResource?: ChangePolicyResourceParam;
  changeDescriptionResource?: ChangeDescriptionResourceParam;
  data?: ApiResourceConfigData;
  error?: AppError;
}

export interface ApiResourceDataState {
  loading?: boolean;
  data?: ApiResourceConfigData;
  error?: AppError;
  flag_reload?: boolean;
}

export interface AddResourceParam {
  methods: EHttpMethod[];
  path: string;
  resourceParamList?: ApiResourceParamEntity[];
}

export interface ResourceParam {
  method: EHttpMethod;
  path: string;
}

export interface AddParameterToResourceParam {
  resource: ResourceParam;
  name: string;
  type: string;
  required: boolean;
  in: string;
  formdata?: string;
}

export interface DeleteParameterFromResourceParam {
  resource: ResourceParam;
  name: string;
  in: string;
}

export interface AddResponseToResourceParam {
  resource: ResourceParam;
  code: number;
  description: string;
}

export interface DeleteResponseFromResourceParam {
  resource: ResourceParam;
  code: number;
}

export interface ChangePolicyResourceParam {
  resource: ResourceParam;
  policy: string;
}

export interface ChangeDescriptionResourceParam {
  resource: ResourceParam;
  description: string;
}

export interface ShowModalAction {
  type: string;
  showParam?: boolean;
  paramData?: AddParameterToResourceParam;
  showResponse?: boolean;
  responseData?: AddResponseToResourceParam;
}

export interface ShowModalState {
  showParam?: boolean;
  paramData?: AddParameterToResourceParam;
  showResponse?: boolean;
  responseData?: AddResponseToResourceParam;
}
