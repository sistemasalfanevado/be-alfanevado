import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: [
        'http://localhost:4200', 
        'https://alfa-nevado-a8c64.web.app', 
        'https://admin-alfa-nevado-78d3d.web.app',
        'https://alfa-nevado-landing-admin.web.app', 
        'https://alfa-nevado-landing-uat.web.app',
        'https://alfanevado.pe',
        'https://www.alfanevado.pe'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
