import { Module } from '@nestjs/common';
import { ZentraDocumentCategoryService } from './zentra-document-category.service';
import { ZentraDocumentCategoryController } from './zentra-document-category.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraDocumentCategoryService],
  controllers: [ZentraDocumentCategoryController],
})
export class ZentraDocumentCategoryModule {}