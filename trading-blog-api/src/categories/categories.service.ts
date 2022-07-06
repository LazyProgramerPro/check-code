import { HttpStatus, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';
import { BaseException } from 'src/app/exceptions';
import { ModelsService } from 'src/app/models/models.service';
import { FilterPostResponse } from 'src/posts/dtos';
import {
  CreateCategoriesResponse,
  CreateCategoryDto,
  FilterCategoriesResponse,
  FilterCategoryDto,
} from './dtos';
//eslint-disable-next-line
const slugify = require('slugify');

@Injectable()
export class CategoriesService {
  constructor(private modelsService: ModelsService) {}

  async index({
    page,
    pageSize,
  }: FilterCategoryDto): Promise<FilterCategoriesResponse> {
    const categories = await this.modelsService.categoryModel
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      code: HttpStatus.OK,
      result: categories,
    };
  }

  async listCategoryPosts(
    slug,
    { page, pageSize }: FilterCategoryDto,
  ): Promise<FilterPostResponse> {
    const category = await this.modelsService.categoryModel.findOne({ slug });
    if (!category) {
      throw new BaseException(404, { message: 'Category not existed!' });
    }

    const posts = await this.modelsService.postModel.aggregate([
      {
        $match: {
          categories: { $in: [category._id] },
        },
      },
      {
        $unwind: {
          path: '$categories',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);

    return {
      code: HttpStatus.OK,
      result: posts,
    };
  }

  async create({
    title,
    parentId,
  }: CreateCategoryDto): Promise<CreateCategoriesResponse> {
    try {
      let slug = slugify(title, { lower: true, locale: 'vi' });
      const existedSlug = await this.modelsService.categoryModel.find({
        slug: { $regex: new RegExp(slug, 'g') },
      });

      if (existedSlug.length) {
        slug += `-${existedSlug.length}`;
      }

      const category = await this.modelsService.categoryModel.create({
        title,
        slug,
        parentId: isValidObjectId(parentId) ? new ObjectId(parentId) : null,
      });

      return {
        code: HttpStatus.CREATED,
        result: category,
      };
    } catch (e) {
      throw new BaseException();
    }
  }
}
