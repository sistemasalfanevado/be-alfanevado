import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'https://alfa-nevado-a8c64.web.app', 'https://admin-alfa-nevado-78d3d.web.app'], // Permite solicitudes desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite el envío de credenciales (cookies, headers de autenticación)
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
