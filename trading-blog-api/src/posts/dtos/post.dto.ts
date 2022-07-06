import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, PaginationRequest } from 'src/app/dtos';
import { Post } from '../schemas';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  keyword: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categories: any;
}

export class CreatePostResponse extends BaseResponse<Post> {}

export class FilterPostDto extends PaginationRequest {}

export class FilterPostResponse extends BaseResponse<Post[]> {}
