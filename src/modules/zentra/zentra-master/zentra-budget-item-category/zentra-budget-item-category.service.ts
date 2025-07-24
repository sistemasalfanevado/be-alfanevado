import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemCategoryDto } from './dto/create-zentra-budget-item-category.dto';
import { UpdateZentraBudgetItemCategoryDto } from './dto/update-zentra-budget-item-category.dto';

@Injectable()
export class ZentraBudgetItemCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraBudgetItemCategoryDto: CreateZentraBudgetItemCategoryDto) {
    return this.prisma.zentraBudgetItemCategory.create({
      data: createZentraBudgetItemCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.zentraBudgetItemCategory.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetItemCategory.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraBudgetItemCategoryDto: UpdateZentraBudgetItemCategoryDto) {
    return this.prisma.zentraBudgetItemCategory.update({
      where: { id },
      data: updateZentraBudgetItemCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetItemCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetItemCategory.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}