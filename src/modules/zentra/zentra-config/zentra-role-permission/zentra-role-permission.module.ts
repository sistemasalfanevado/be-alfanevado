import { Module } from '@nestjs/common';
import { ZentraRolePermissionController } from './zentra-role-permission.controller';
import { ZentraRolePermissionService } from './zentra-role-permission.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraRolePermissionController],
  providers: [ZentraRolePermissionService],
})
export class ZentraRolePermissionModule {}