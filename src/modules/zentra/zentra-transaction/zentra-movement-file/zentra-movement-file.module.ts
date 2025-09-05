import { Module } from '@nestjs/common';
import { ZentraMovementFileService } from './zentra-movement-file.service';
import { ZentraMovementFileController } from './zentra-movement-file.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraMovementFileService],
  controllers: [ZentraMovementFileController],
})
export class ZentraMovementFileModule {}