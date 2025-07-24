import { Module } from '@nestjs/common';
import { ZentraRoleController } from './zentra-role.controller';
import { ZentraRoleService } from './zentra-role.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraRoleController],
  providers: [ZentraRoleService],
})
export class ZentraRoleModule {}