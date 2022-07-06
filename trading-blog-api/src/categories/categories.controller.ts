import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  FilterCategoriesResponse,
  FilterCategoryDto,
} from './dtos';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  @ApiOkResponse({
    type: FilterCategoriesResponse,
  })
  async filter(
    @Query() filter: FilterCategoryDto,
  ): Promise<FilterCategoriesResponse> {
    return this.categoriesService.index(filter);
  }

  @Get('/:slug')
  async getPost(
    @Param('slug') slug: string,
    @Query() filter: FilterCategoryDto,
  ) {
    return this.categoriesService.listCategoryPosts(slug, filter);
  }

  @Post('/')
  async create(@Body() data: CreateCategoryDto) {
    return this.categoriesService.create(data);
  }
}
