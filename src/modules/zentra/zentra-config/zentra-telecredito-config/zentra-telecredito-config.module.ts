import { Module } from '@nestjs/common';
import { ZentraTelecreditoConfigController } from './zentra-telecredito-config.controller';
import { ZentraTelecreditoConfigService } from './zentra-telecredito-config.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraTelecreditoConfigController],
  providers: [ZentraTelecreditoConfigService],
})
export class ZentraTelecreditoConfigModule {}