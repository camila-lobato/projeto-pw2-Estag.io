import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
<<<<<<< HEAD
import * as methodOverride from 'method-override';
=======
>>>>>>> aeb53677f1a49ad6cf607ac7a24d83a9ebc0bc2a
import { join } from 'path';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';
import { helpers } from './common/helpers/hbs-functions';
<<<<<<< HEAD
import { FlashMiddleware } from './common/middlewares/flash.middleware';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await AppDataSource.initialize();
=======

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

>>>>>>> aeb53677f1a49ad6cf607ac7a24d83a9ebc0bc2a
  const hbs = exphbs.create({
    extname: '.hbs', // Extensão dos arquivos
    layoutsDir: join(__dirname, 'views/_layouts'), // Pasta de layouts
    partialsDir: join(__dirname, 'views/_partials'), // Pasta de partials
    defaultLayout: 'main', // Layout padrão
    helpers,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.engine('.hbs', hbs.engine);
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

<<<<<<< HEAD
  app.use(methodOverride('_method'));

=======
>>>>>>> aeb53677f1a49ad6cf607ac7a24d83a9ebc0bc2a
  app.useGlobalFilters(new NotFoundExceptionFilter());

  const port = process.env.PORT || 3333;

  await app.listen(port, () =>
    Logger.log(`Server running on port ${port}`, 'Bootstrap'),
  );
}
void bootstrap();
