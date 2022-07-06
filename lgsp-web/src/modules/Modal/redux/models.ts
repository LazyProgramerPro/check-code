import { ReactNode } from 'react';
import { AppError } from "src/models/common";

export interface IModalState {
showModal?: boolean;
title?: string,
component?: ReactNode | null;
}


export interface IModalAction{
  type: string,
  payload?: IModalState,
  error?: AppError,
}
