import { Module } from '@nestjs/common';
import { ContentYearController } from './content-year.controller';
import { ContentYearService } from './content-year.service';
import { PrismaModule } from '../../../prisma/prisma.module'; // Importa el módulo de Prisma
import { AuthModule } from '../../../auth/auth.module';


@Module({
  imports: [PrismaModule, AuthModule], // Importa PrismaModule para usar PrismaService
  controllers: [ContentYearController],
  providers: [ContentYearService],
})
export class ContentYearModule {}