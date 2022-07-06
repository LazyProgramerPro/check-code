import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { IBaseFilterRequest, IPaginationRequest } from '../interfaces';

export class BaseFilterRequest implements IBaseFilterRequest {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  keyword?: string;
}

export class PaginationRequest implements IPaginationRequest {
  @ApiProperty({
    default: 1,
  })
  @Type(() => Number)
  @IsNotEmpty({ message: 'validate.page_is_not_empty' })
  @Min(1, { message: 'validate.page_must_not_be_less_than_1' })
  page: number;

  @ApiProperty({
    default: 10,
  })
  @Type(() => Number)
  @IsNotEmpty({ message: 'validate.page_size_is_not_empty' })
  @Min(1, { message: 'validate.page_size_must_not_be_less_than_1' })
  pageSize: number;
}
