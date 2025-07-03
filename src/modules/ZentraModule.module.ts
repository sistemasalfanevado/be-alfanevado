import { Module } from '@nestjs/common';

import { ZentraAuthModule } from '../auth/zentra/zentra-auth.module';
import { ZentraUsersModule } from './zentra/zentra-users/zentra-users.module';
import { ZentraPageModule } from './zentra/zentra-page/zentra-page.module';
import { ZentraPageGroupModule } from './zentra/zentra-page-group/zentra-page-group.module';
import { ZentraRoleModule } from './zentra/zentra-role/zentra-role.module';
import { ZentraRolePermissionModule } from './zentra/zentra-role-permission/zentra-role-permission.module';

@Module({
  imports: [
    ZentraAuthModule,
    ZentraUsersModule,
    ZentraPageModule,
    ZentraPageGroupModule,
    ZentraRoleModule,
    ZentraRolePermissionModule
  ],
})
export class ZentraMainModule {}