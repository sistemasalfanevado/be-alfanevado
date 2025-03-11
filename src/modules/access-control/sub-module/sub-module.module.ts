import { Module } from '@nestjs/common';
import { SubModuleController } from './sub-module.controller';
import { SubModuleService } from './sub-module.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubModuleController],
  providers: [SubModuleService],
})
export class SubModuleModule {}