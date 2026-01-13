import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { PrismaModule } from './prisma/prisma.module';

import { BitrixMainModule } from './modules/BitrixModule.module';
import { LandingMainModule } from './modules/LandingModule.module';
import { ZentraMainModule } from './modules/ZentraModule.module';

import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core'; // Importa APP_GUARD
import { AuditInterceptor } from './common/interceptors/audit.interceptor'; // Ajusta la ruta
import { JwtAuthGuard } from './auth/shared/guards/jwt-auth.guard'; // Asegúrate de importar tu Guard

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // recomendado
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"Alfa Nevado Sistemas" <sistemas.alfanevado@gmail.com>',
      },
    }),

    PrismaModule,
    BitrixMainModule,
    LandingMainModule,
    ZentraMainModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor, // Esto lo activa globalmente
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Esto activa la seguridad en TODO el sistema
    },
  ],
})
export class AppModule {}