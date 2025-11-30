import { Module } from '@nestjs/common';
import { ZentraAreaService } from './zentra-area.service';
import { ZentraAreaController } from './zentra-area.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraAreaService],
  controllers: [ZentraAreaController],
})
export class ZentraAreaModule {}