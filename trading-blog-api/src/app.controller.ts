import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  index(): any {
    return {
      version: '1.0',
      status: 'active',
      timestamp: Date.now(),
    };
  }
}
