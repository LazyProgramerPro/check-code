import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/categories/schemas';
import { Post } from 'src/posts/schemas';
import { User } from 'src/users/schemas';

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(User.name) public readonly userModel: Model<User>,
    @InjectModel(Category.name) public readonly categoryModel: Model<Category>,
    @InjectModel(Post.name) public readonly postModel: Model<Post>,
  ) {}
}
