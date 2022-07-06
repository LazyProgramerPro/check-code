import { HttpStatus, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';
import { BaseException } from 'src/app/exceptions';
import { ModelsService } from 'src/app/models/models.service';
import { User } from 'src/users/schemas';
import {
  CreatePostDto,
  CreatePostResponse,
  FilterPostDto,
  FilterPostResponse,
} from './dtos';
//eslint-disable-next-line
const slugify = require('slugify');

@Injectable()
export class PostsService {
  constructor(private modelsService: ModelsService) {}

  async filter({ page, pageSize }: FilterPostDto): Promise<FilterPostResponse> {
    const posts = await this.modelsService.postModel.aggregate([
      {
        $match: {},
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

  async create(
    files: any[],
    { title, content, keyword, description, categories, author }: CreatePostDto,
    user: User,
  ): Promise<CreatePostResponse> {
    try {
      let slug = slugify(title, { lower: true, locale: 'vi' });
      const existedSlug = await this.modelsService.postModel.find({
        slug: { $regex: new RegExp(slug, 'g') },
      });

      if (existedSlug.length) {
        slug += `-${existedSlug.length}`;
      }

      if (categories && !Array.isArray(categories)) {
        categories = categories.split(',');
      }
      const post = await this.modelsService.postModel.create({
        title,
        content,
        slug,
        keyword,
        description,
        author,
        thumbnails: files.map(obj => obj.path),
        categories: categories
          .filter(id => isValidObjectId(id))
          .map(id => new ObjectId(id)),
        userId: user._id,
      });
      return {
        code: HttpStatus.CREATED,
        result: post,
      };
    } catch (e) {
      throw new BaseException();
    }
  }
}
