import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentCategoryDto } from './dto/create-zentra-document-category.dto';
import { UpdateZentraDocumentCategoryDto } from './dto/update-zentra-document-category.dto';

@Injectable()
export class ZentraDocumentCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraDocumentCategoryDto) {
    return this.prisma.zentraDocumentCategory.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.zentraDocumentCategory.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraDocumentCategory.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDto: UpdateZentraDocumentCategoryDto) {
    return this.prisma.zentraDocumentCategory.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocumentCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocumentCategory.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}