import { Module } from '@nestjs/common';
import { ZentraPartyService } from './zentra-party.service';
import { ZentraPartyController } from './zentra-party.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPartyService],
  controllers: [ZentraPartyController],
})
export class ZentraPartyModule {}