import { ConfigModule } from '@nestjs/config';

export const configModule = ConfigModule.forRoot({
  envFilePath: process.env.NODE_ENV === 'dev' ? `.env.development` : `.env`,
  isGlobal: true,
});
