import { Module } from '@nestjs/common';
import { ZentraExtrasService } from './zentra-extras.service';
import { ZentraExtrasController } from './zentra-extras.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraExtrasService],
  controllers: [ZentraExtrasController],
})
export class ZentraExtrasModule {}