import { Module } from '@nestjs/common';
import { ZentraPartyRoleService } from './zentra-party-role.service';
import { ZentraPartyRoleController } from './zentra-party-role.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPartyRoleService],
  controllers: [ZentraPartyRoleController],
})
export class ZentraPartyRoleModule {}