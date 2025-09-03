import { Module } from '@nestjs/common';
import { ZentraSaleTypeService } from './zentra-sale-type.service';
import { ZentraSaleTypeController } from './zentra-sale-type.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraSaleTypeService],
  controllers: [ZentraSaleTypeController],
})
export class ZentraSaleTypeModule {}