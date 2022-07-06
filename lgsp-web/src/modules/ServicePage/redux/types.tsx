import { AppError } from 'src/models/common';

export interface ServicePageState {
  total: number;
  rows: any[];
  params: any;
  error?: AppError;
}

export interface getServices {
  category?: string;
  departmentLevel?: string;
  departmentUnit?: string;
  page?: number;
  size?: number;
  text?: string;
}
