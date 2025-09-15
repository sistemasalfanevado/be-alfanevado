import { Module } from '@nestjs/common';
import { ZentraRoleActionController } from './zentra-role-action.controller';
import { ZentraRoleActionService } from './zentra-role-action.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraRoleActionController],
  providers: [ZentraRoleActionService],
})
export class ZentraRoleActionModule {}