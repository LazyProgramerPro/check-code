import { ApiProperty } from '@nestjs/swagger';
import { IBaseResponse, IPaginationResponse } from '../interfaces';

export class BaseResponse<T> implements IBaseResponse<T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  key?: string;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  result?: T;
}

export class PaginationResponse<T> implements IPaginationResponse<T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  result: T[];

  @ApiProperty()
  current: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  total: number;
}
