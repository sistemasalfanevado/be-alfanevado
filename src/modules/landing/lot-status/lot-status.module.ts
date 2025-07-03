import { Module } from '@nestjs/common';
import { LotStatusController } from './lot-status.controller';
import { LotStatusService } from './lot-status.service';
import { PrismaModule } from '../../../prisma/prisma.module'; // Importa el módulo de Prisma
import { AuthModule } from '../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule], // Importa PrismaModule para usar PrismaService
  controllers: [LotStatusController],
  providers: [LotStatusService],
})
export class LotStatusModule {}