import { Module } from '@nestjs/common';
import { ZentraUserPartyService } from './zentra-user-party.service';
import { ZentraUserPartyController } from './zentra-user-party.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraUserPartyService],
  controllers: [ZentraUserPartyController],
})
export class ZentraUserPartyModule {}