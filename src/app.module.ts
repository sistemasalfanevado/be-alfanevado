import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { PrismaModule } from './prisma/prisma.module';

import { BitrixMainModule } from './modules/BitrixModule.module';
import { LandingMainModule } from './modules/LandingModule.module';
import { ZentraMainModule } from './modules/ZentraModule.module';

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
})
export class AppModule {}