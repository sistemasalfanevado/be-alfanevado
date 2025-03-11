import { Module } from '@nestjs/common';
import { UserModuleController } from './user-module.controller';
import { UserModuleService } from './user-module.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserModuleController],
  providers: [UserModuleService],
})
export class UserModuleModule {}