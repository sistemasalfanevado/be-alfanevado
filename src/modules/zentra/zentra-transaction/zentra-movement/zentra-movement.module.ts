import { Module } from '@nestjs/common';
import { ZentraMovementService } from './zentra-movement.service';
import { ZentraMovementController } from './zentra-movement.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraMovementService],
  controllers: [ZentraMovementController],
})
export class ZentraMovementModule {}