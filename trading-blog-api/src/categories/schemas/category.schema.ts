import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { createSchema } from 'src/app/schemas';

@Schema()
export class Category extends Document {
  @Prop()
  title: string;

  @Prop({
    unique: true,
  })
  slug: string;

  @Prop()
  parentId: ObjectId;
}

export const CategorySchema = createSchema(Category);
CategorySchema.index({ slug: 1 });
