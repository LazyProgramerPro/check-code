import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { createSchema } from 'src/app/schemas';
import { User } from 'src/users/schemas';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop({
    unique: true,
  })
  slug: string;

  @Prop()
  author: string;

  @Prop()
  userId: ObjectId;

  @Prop()
  thumbnails: string[];

  @Prop()
  content: string;

  @Prop()
  keyword: string;

  @Prop()
  description: string;

  @Prop()
  categories: ObjectId[];
}

export const PostSchema = createSchema(Post);
PostSchema.index({ slug: 1 });
