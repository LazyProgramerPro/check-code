import { ModelDefinition } from '@nestjs/mongoose';
import { CategorySchema } from 'src/categories/schemas';
import { PostSchema } from 'src/posts/schemas';
import { UserSchema } from 'src/users/schemas';

export const ENTITY_NAME = {
  user: 'User',
  category: 'Category',
  post: 'Post',
};

export const MODEL_LIST: ModelDefinition[] = [
  {
    name: ENTITY_NAME.user,
    schema: UserSchema,
  },
  {
    name: ENTITY_NAME.category,
    schema: CategorySchema,
  },
  {
    name: ENTITY_NAME.post,
    schema: PostSchema,
  },
];
