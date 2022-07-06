import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { SystemConfigService } from './app/config/system/system-config.service';
import { AllExceptionFilter, BaseException } from './app/exceptions';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const systemConfigService: SystemConfigService = app.get(SystemConfigService);

  app.setGlobalPrefix(systemConfigService.apiPrefix);
  app.use(morgan('tiny'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, {
          key: 'error.validate_entity_error',
          message: 'Validate entity error!',
          error: validationErrors.map(error => ({
            field: error.property,
            message: Object.values(error.constraints)[0] || '',
          })),
        });
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('API Documents')
    .setDescription('API Documents')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(systemConfigService.apiPath, app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
