import { Module } from '@nestjs/common';
import { ZentraPageGroupController } from './zentra-page-group.controller';
import { ZentraPageGroupService } from './zentra-page-group.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraPageGroupController],
  providers: [ZentraPageGroupService],
})
export class ZentraPageGroupModule {}