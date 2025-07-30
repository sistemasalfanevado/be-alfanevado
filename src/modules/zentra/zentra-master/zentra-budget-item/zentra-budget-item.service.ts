import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemDto } from './dto/create-zentra-budget-item.dto';
import { UpdateZentraBudgetItemDto } from './dto/update-zentra-budget-item.dto';

@Injectable()
export class ZentraBudgetItemService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBudgetItemDto) {
    const { currencyId, categoryId, projectId, ...data } = createDto;

    return this.prisma.zentraBudgetItem.create({
      data: {
        ...data,
        currency: { connect: { id: currencyId } },
        category: { connect: { id: categoryId } },
        project: { connect: { id: projectId } }
      },
      include: {
        currency: true,
        category: true,
        project: true
      }
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null },
      include: {
        currency: true,
        category: true,
        project: true
      }
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      amount: item.amount,
      executedAmount: item.executedAmount,

      categoryId: item.category.id,
      categoryName: item.category.name,

      projectId: item.project.id,
      projectName: item.project.name,

      currencyId: item.currency.id,
      currencyName: item.currency.name,
    }));
  }



  async findOne(id: string) {
    return this.prisma.zentraBudgetItem.findUnique({
      where: { id, deletedAt: null },
      include: {
        currency: true,
        category: true,
        project: true,
        documents: true,
        movements: true
      }
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetItemDto) {
    const { currencyId, categoryId, projectId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (currencyId) updateData.currency = { connect: { id: currencyId } };
    if (categoryId) updateData.category = { connect: { id: categoryId } };
    if (projectId) updateData.project = { connect: { id: projectId } };

    return this.prisma.zentraBudgetItem.update({
      where: { id },
      data: updateData,
      include: {
        currency: true,
        category: true,
        project: true
      }
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetItem.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetItem.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
}