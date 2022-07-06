import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailConfigOptions } from 'src/app/interfaces';
import { CONFIG_KEY } from 'src/app/constants/config.constant';

@Injectable()
export class SystemConfigService {
  constructor(private configService: ConfigService) {}

  get apiPrefix(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.API_PREFIX`);
  }

  get apiPath(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.API_PATH`);
  }

  get jwtSecret(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.JWT_SECRET`);
  }

  get passwordSalt(): number {
    return +this.configService.get<number>(
      `${CONFIG_KEY.SYSTEM}.PASSWORD_SALT`,
    );
  }

  get redisHost(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.REDIS_HOST`);
  }

  get redisPort(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.REDIS_PORT`);
  }

  get mailDriver(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.MAIL_DRIVER`);
  }

  get mailHost(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.MAIL_HOST`);
  }

  get mailPort(): number {
    return +this.configService.get<number>(`${CONFIG_KEY.SYSTEM}.MAIL_PORT`);
  }

  get mailUsername(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.MAIL_USERNAME`);
  }

  get mailPassword(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.MAIL_PASSWORD`);
  }

  get mailEncryption(): string {
    return this.configService.get<string>(
      `${CONFIG_KEY.SYSTEM}.MAIL_ENCRYPTION`,
    );
  }

  get mailFrom(): string {
    return this.configService.get<string>(`${CONFIG_KEY.SYSTEM}.MAIL_FROM`);
  }

  get mailConfig(): EmailConfigOptions {
    return {
      host: this.mailHost,
      port: this.mailPort,
      auth: {
        user: this.mailUsername,
        pass: this.mailPassword,
      },
    };
  }
}
