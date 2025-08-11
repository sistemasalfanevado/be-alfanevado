import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetCategoryDto } from './dto/create-zentra-budget-category.dto';
import { UpdateZentraBudgetCategoryDto } from './dto/update-zentra-budget-category.dto';

@Injectable()
export class ZentraBudgetCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraBudgetCategoryDto) {
    return this.prisma.zentraBudgetCategory.create({
      data: createDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.zentraBudgetCategory.findMany({
      where: { deletedAt: null },
      orderBy: {
        name: 'asc',
      },
    });

  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetCategory.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetCategoryDto) {
    return this.prisma.zentraBudgetCategory.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetCategory.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}