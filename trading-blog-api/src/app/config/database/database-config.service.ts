import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_KEY } from 'src/app/constants/config.constant';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get mongoHost(): string {
    return this.configService.get<string>(`${CONFIG_KEY.DATABASE}.MONGO_HOST`);
  }

  get mongoPort(): string {
    return this.configService.get<string>(`${CONFIG_KEY.DATABASE}.MONGO_PORT`);
  }

  get mongoUsername(): string {
    return this.configService.get<string>(
      `${CONFIG_KEY.DATABASE}.MONGO_USERNAME`,
    );
  }

  get mongoPassword(): string {
    return this.configService.get<string>(
      `${CONFIG_KEY.DATABASE}.MONGO_PASSWORD`,
    );
  }

  get mongoDatabase(): string {
    return this.configService.get<string>(
      `${CONFIG_KEY.DATABASE}.MONGO_DATABASE`,
    );
  }

  get mongoUri(): string {
    return `mongodb://${this.mongoUsername}:${this.mongoPassword}@${this.mongoHost}:${this.mongoPort}/${this.mongoDatabase}`;
  }
}
