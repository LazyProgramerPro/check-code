import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SystemConfigService } from './system-config.service';
import systemConfiguration from './system.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [systemConfiguration],
    }),
  ],
  providers: [SystemConfigService],
  exports: [SystemConfigService],
})
export class SystemConfigModule {}
