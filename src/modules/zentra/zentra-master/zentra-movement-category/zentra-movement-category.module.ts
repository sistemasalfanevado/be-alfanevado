import { Module } from '@nestjs/common';
import { ZentraMovementCategoryService } from './zentra-movement-category.service';
import { ZentraMovementCategoryController } from './zentra-movement-category.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraMovementCategoryService],
  controllers: [ZentraMovementCategoryController],
})
export class ZentraMovementCategoryModule {}