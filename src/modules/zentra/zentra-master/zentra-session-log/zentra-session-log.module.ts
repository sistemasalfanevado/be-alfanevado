import { Module } from '@nestjs/common';
import { ZentraSessionLogService } from './zentra-session-log.service';
import { ZentraSessionLogController } from './zentra-session-log.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraSessionLogService],
  controllers: [ZentraSessionLogController],
})
export class ZentraSessionLogModule {}