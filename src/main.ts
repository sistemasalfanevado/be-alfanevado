import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://alfa-nevado-a8c64.web.app',
      'https://admin-alfa-nevado-78d3d.web.app',
      'https://alfa-nevado-landing-admin.web.app',
      'https://alfa-nevado-landing-uat.web.app',
      'https://alfanevado.pe',
      'https://www.alfanevado.pe',
      'https://alfa-nevado-landing-prod.web.app',
      'https://angular-demo-zentra.web.app',],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
