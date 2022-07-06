import { Global, Module, Provider } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { SystemConfigModule } from '../config/system/system-config.module';
import { SystemConfigService } from '../config/system/system-config.service';
import { EMAIL_TRANSPORT_TOKEN } from '../constants';
import { EmailService } from './email.service';

const EmailProvider: Provider = {
  provide: EMAIL_TRANSPORT_TOKEN,
  useFactory: (systemConfig: SystemConfigService) => {
    return createTransport(systemConfig.mailConfig);
  },
  inject: [SystemConfigService],
};

@Global()
@Module({
  imports: [SystemConfigModule],
  providers: [EmailProvider, EmailService],
  exports: [EmailService, EMAIL_TRANSPORT_TOKEN],
})
export class EmailModule {}
