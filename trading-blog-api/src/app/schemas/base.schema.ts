import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from '@nestjs/common';

@Schema()
export class BaseEntity {
  @Prop({
    type: Date,
    required: false,
  })
  deletedAt: Date;

  @Prop({
    type: ObjectId,
    required: false,
  })
  deletedBy: ObjectId;
}

export const createSchema = <T>(target: Type<T>) => {
  const schema = SchemaFactory.createForClass<T>(target);
  schema.add(BaseEntity);
  schema.set('toObject', { virtuals: true });
  schema.set('toJSON', { virtuals: true });
  schema.set('timestamps', true);
  return schema;
};
