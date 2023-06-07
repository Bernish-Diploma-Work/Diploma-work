import {
  HttpException,
  HttpStatus,
  INestApplication,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { json } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';

interface SetupNestAppOptions {
  app: INestApplication;
  title: string;
}

function setupNestApp({ app, title }: SetupNestAppOptions): void {
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin', // remove after move to s3
      },
    }),
  );

  app.use(json({ limit: '1mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (!configService.isDevMode) {
    const whitelist = process.env.CORS_LIST?.split(',') || [];
    console.log('>> whitelist', whitelist);
    app.enableCors({
      methods: ['GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }

        const getHost = (url) => {
          const matchString = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
          if (matchString) {
            return matchString[1].split('.').slice(-2).join('.');
          } else {
            return null;
          }
        };

        if (whitelist.some((item) => getHost(item) === getHost(origin))) {
          callback(null, true);
        } else {
          callback(
            new HttpException(
              'Not allowed by CORS',
              HttpStatus.METHOD_NOT_ALLOWED,
            ),
          );
        }
      },
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
  } else {
    app.enableCors({
      origin: '*',
    });
  }

  setupSwagger(app, title);
}

function setupSwagger(app, title) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle(title)
    .setDescription('API documentation')
    .addTag('Rest API')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/docs', app, swaggerDoc);
}

export default setupNestApp;
