import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemCategoryDto } from './dto/create-zentra-budget-item-category.dto';
import { UpdateZentraBudgetItemCategoryDto } from './dto/update-zentra-budget-item-category.dto';

@Injectable()
export class ZentraBudgetItemCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraBudgetItemCategoryDto) {
    const { budgetCategoryId, ...data } = createDto;

    return this.prisma.zentraBudgetItemCategory.create({
      data: {
        ...data,
        budgetCategory: { connect: { id: budgetCategoryId } },
      },
      include: {
        budgetCategory: true, // para devolver también la categoría principal
      },
    });
  }

  async findAll() {
    return this.prisma.zentraBudgetItemCategory.findMany({
      where: { deletedAt: null },
      include: {
        budgetCategory: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetItemCategory.findUnique({
      where: { id, deletedAt: null },
      include: {
        budgetCategory: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetItemCategoryDto) {
    const { budgetCategoryId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (budgetCategoryId) {
      updateData.budgetCategory = { connect: { id: budgetCategoryId } };
    }

    return this.prisma.zentraBudgetItemCategory.update({
      where: { id },
      data: updateData,
      include: {
        budgetCategory: true,
      },
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