import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaModule } from '../../../prisma/prisma.module'; // Importa el módulo de Prisma
import { AuthModule } from '../../../auth/landing/auth.module';


@Module({
  imports: [PrismaModule, AuthModule], // Importa PrismaModule para usar PrismaService
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}