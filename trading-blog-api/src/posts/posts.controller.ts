import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ApiMultiFile, CurrentUser } from 'src/app/decorators';
import { BaseException } from 'src/app/exceptions';
import { JwtAuthGuard } from 'src/app/guards';
import {
  CreatePostDto,
  CreatePostResponse,
  FilterPostDto,
  FilterPostResponse,
} from './dtos';
import { PostsService } from './posts.service';
//eslint-disable-next-line
const slugify = require('slugify');

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/')
  async filter(@Query() filter: FilterPostDto): Promise<FilterPostResponse> {
    return this.postService.filter(filter);
  }

  @Get('/files/:slug')
  async file(@Param('slug') slug: string, @Res() res) {
    return res.sendFile(slug, { root: '.' });
  }

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('files', {
    title: { type: 'string' },
    content: { type: 'string' },
    keyword: { type: 'string' },
    description: { type: 'string' },
    categories: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const name = slugify(file.originalname.split('.')[0]);
          const fileExtName = file.originalname.split('.').pop();
          const randomName = Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}.${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BaseException(400, {
              message: 'Only image files are allowed',
            }),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @UploadedFiles() files: any,
    @Body() data: CreatePostDto,
    @CurrentUser() user,
  ): Promise<CreatePostResponse> {
    return this.postService.create(files, data, user);
  }

  @Get('/:id')
  async delete(@Param('id') id: string) {
    return;
  }
}
