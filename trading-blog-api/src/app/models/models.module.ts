import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_LIST } from './constants';
import { ModelsService } from './models.service';

@Module({
  imports: [MongooseModule.forFeature(MODEL_LIST)],
  providers: [ModelsService],
  exports: [ModelsService],
})
export class ModelsModule { }
