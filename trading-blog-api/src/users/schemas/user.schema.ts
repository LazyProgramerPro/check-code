import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createSchema } from 'src/app/schemas';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password?: string;
}

export const UserSchema = createSchema(User);
