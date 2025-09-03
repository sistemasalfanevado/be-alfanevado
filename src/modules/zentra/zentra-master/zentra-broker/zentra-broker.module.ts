import { Module } from '@nestjs/common';
import { ZentraBrokerService } from './zentra-broker.service';
import { ZentraBrokerController } from './zentra-broker.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBrokerService],
  controllers: [ZentraBrokerController],
})
export class ZentraBrokerModule {}