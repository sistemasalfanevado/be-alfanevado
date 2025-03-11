import { Module } from '@nestjs/common';
import { ModuleSubModuleController } from './module-sub-module.controller';
import { ModuleSubModuleService } from './module-sub-module.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ModuleSubModuleController],
  providers: [ModuleSubModuleService],
})
export class ModuleSubModuleModule {}