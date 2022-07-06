import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ModelsModule } from 'src/app/models/models.module';

@Module({
  imports: [ModelsModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
