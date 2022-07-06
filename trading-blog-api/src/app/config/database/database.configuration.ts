import { registerAs } from '@nestjs/config';
import { CONFIG_KEY } from 'src/app/constants/config.constant';

export default registerAs(CONFIG_KEY.DATABASE, () => ({
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
}));
