import { AppError } from 'src/models/common';

export interface IGroupApiConfigObject {
  id: string;
}

export interface ApiDefinition {
  data: any;
}
export interface ApiDefinitionState {
  loading?: boolean;
  show?: boolean;
  params?: ApiDefinition;
  error?: AppError;
}

export interface ApiDefinitionAction {
  type: string;
  show?: boolean;
  params?: ApiDefinition;
  error?: AppError;
  id?: string;
}

export interface ParamsCreateVersion {
  defaultVersion: boolean;
  id: string;
  version: string;
}
