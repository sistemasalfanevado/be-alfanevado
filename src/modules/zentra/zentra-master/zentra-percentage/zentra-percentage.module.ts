import { Module } from '@nestjs/common';
import { ZentraPercentageService } from './zentra-percentage.service';
import { ZentraPercentageController } from './zentra-percentage.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule
  ],
  providers: [ZentraPercentageService],
  controllers: [ZentraPercentageController],
  exports: [ZentraPercentageService], 
})
export class ZentraPercentageModule {}