import { AppError, ResponseBase } from 'src/models/baseResponse';

export interface ICategoryObject {
  name: string;
  count: number;
}

export interface IOrganizationItem {
  name: string;
  domain: string;
}

export interface IOrganizationObject {
  organizations: IOrganizationItem[];
  group_name: string;
}

export interface IStatsObject {
  icon: string | null;
  count: number;
  stat_name: string;
}

export interface IHomePagePayload {
  introduction?: string;
  images?: string[];
  categories?: ICategoryObject[];
  organizations?: IOrganizationObject[];
  stats?: IStatsObject[];
}

export interface IHomePageParams {}

export interface IHomePageAction {
  type: string;
  payload?: IHomePagePayload;
  error?: AppError;
  params?: IHomePageParams;
}

export interface IHomePageResponse extends ResponseBase {
  payload?: IHomePagePayload;
}

export interface IHomePageState {
  loading: boolean;
  error?: AppError;
  data?: IHomePagePayload;
}

export interface IFooterPayload {
  address?: string;
  mobile?: string;
  email?: string;
  telephone?: string;
  fax?: string;
}

export interface IFooterResponse extends ResponseBase {
  payload?: IFooterPayload;
}

export interface IFooterState {
  loading: boolean;
  error?: AppError;
  data?: IFooterPayload;
}

export interface IFooterParams {}

export interface IFooterAction {
  type: string;
  payload?: IFooterPayload;
  error?: AppError;
  params?: IFooterParams;
}
