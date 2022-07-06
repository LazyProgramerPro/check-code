import { registerAs } from '@nestjs/config';
import { CONFIG_KEY } from 'src/app/constants/config.constant';

export default registerAs(CONFIG_KEY.SYSTEM, () => ({
  API_PREFIX: process.env.API_PREFIX,
  API_PATH: process.env.API_PATH,
  JWT_SECRET: process.env.JWT_SECRET,
  PASSWORD_SALT: process.env.PASSWORD_SALT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  MAIL_DRIVER: process.env.MAIL_DRIVER,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,
  MAIL_FROM: process.env.MAIL_FROM,
}));
