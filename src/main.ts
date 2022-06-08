import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as morgan from 'morgan';
import {AllExceptionsFilter} from './shared/exceptions/allExceptionFilter.exception';
import * as bodyParser from 'body-parser';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import * as express from 'express';
import {join} from 'path';

async function bootstrap() {
  // Creating and setting up the express instanced server
  const server = express();
  server.locals.basedir = join(__dirname, '..', 'views');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  // the next two lines did the trick
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');


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
