import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ModelsModule } from 'src/app/models/models.module';
import { SystemConfigModule } from 'src/app/config/system/system-config.module';
import { SystemConfigService } from 'src/app/config/system/system-config.service';
import { JwtStrategy } from 'src/app/strategies';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    SystemConfigModule,
    ModelsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SystemConfigModule],
      useFactory: (systemConfig: SystemConfigService) => ({
        secret: systemConfig.jwtSecret,
      }),
      inject: [SystemConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
