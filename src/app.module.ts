import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';


import { BitrixMainModule } from './modules/BitrixModule.module';
import { LandingMainModule } from './modules/LandingModule.module';
import { ZentraMainModule } from './modules/ZentraModule.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
  
    BitrixMainModule,
    LandingMainModule,
    ZentraMainModule
  ],
})
export class AppModule { }