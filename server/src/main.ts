import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupNestApp from './shared/setupNestApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const title = 'Bernish-diploma-backend';
  setupNestApp({
    app,
    title,
  });
  await app.listen(3001);
}
bootstrap();
