import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import {AllExceptionsFilter} from './shared/exceptions/allExceptionFilter.exception';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // the next two lines did the trick
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('NestJS Shopping Cart App')
      .setDescription('NestJS Shopping Cart Endpoint')
      .setVersion('1.0')
      .setBasePath('api')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(morgan('tiny'));

  await app.listen(4000);
}
bootstrap();
