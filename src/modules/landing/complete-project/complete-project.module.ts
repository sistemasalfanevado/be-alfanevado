import { Module } from '@nestjs/common';
import { CompleteProjectService } from './complete-project.service';
import { CompleteProjectController } from './complete-project.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from '../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [CompleteProjectService],
  controllers: [CompleteProjectController],
})
export class CompleteProjectModule {}