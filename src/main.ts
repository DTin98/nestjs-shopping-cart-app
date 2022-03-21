import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AllExceptionsFilter } from './shared/exceptions/allExceptionFilter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS ComChayRop App')
    .setDescription('NestJS ComChayRop Endpoint')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(morgan('tiny'));

  await app.listen(4000);
}
bootstrap();
