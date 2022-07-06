import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { DatabaseConfigModule } from './app/config/database/database-config.module';
import { DatabaseConfigService } from './app/config/database/database-config.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (databaseConfigService: DatabaseConfigService) => ({
        uri: databaseConfigService.mongoUri,
      }),
      inject: [DatabaseConfigService],
    }),
    MulterModule.register({
      dest: './upload',
    }),
    UsersModule,
    CategoriesModule,
    PostsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
