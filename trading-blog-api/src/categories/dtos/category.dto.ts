import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, PaginationRequest } from 'src/app/dtos';
import { Category } from '../schemas';

export class CreateCategoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  parentId: string;
}

export class FilterCategoryDto extends PaginationRequest {}

export class CreateCategoriesResponse extends BaseResponse<Category> {}
export class FilterCategoriesResponse extends BaseResponse<Category[]> {}
