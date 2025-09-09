import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemHistoryDto } from './dto/create-zentra-budget-item-history.dto';
import { UpdateZentraBudgetItemHistoryDto } from './dto/update-zentra-budget-item-history.dto';

import * as moment from 'moment';

@Injectable()
export class ZentraBudgetItemHistoryService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBudgetItemHistoryDto) {

    await this.prisma.zentraBudgetItemHistory.create({
      data: createDto,
    });

    await this.prisma.zentraBudgetItem.update({
      where: { id: createDto.budgetItemId },
      data: { amount: createDto.newAmount },
    });
    
    return { message: 'Historial registrado correctamente' };
  }

  async findAll() {

    const results = await this.prisma.zentraBudgetItemHistory.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        user: true,
        budgetItem: {
          include: {
            definition: true
          }
        },
      },
      orderBy: { registeredAt: 'desc' },
    });

    return results.map((item) => ({
      id: item.id,
      budgetItemId: item.budgetItem.id,
      budgetItemName: item.budgetItem.definition.name,

      userId: item.user.id,
      userName: `${item.user.firstName} ${item.user.lastName}`,

      oldAmount: item.oldAmount,
      newAmount: item.newAmount,
      percentageChange: item.percentageChange,
      percentageChangeText: (item.percentageChange) + ' %',
      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY')

    }));

  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetItemHistory.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: true,
        budgetItem: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetItemHistoryDto) {
    return this.prisma.zentraBudgetItemHistory.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetItemHistory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetItemHistory.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  /**
   * ✅ Obtener todo el historial de un presupuesto (budgetItemId)
   */
  async findByBudgetItem(budgetItemId: string) {

    const results = await this.prisma.zentraBudgetItemHistory.findMany({
      where: {
        budgetItemId,
        deletedAt: null,
      },
      include: {
        user: true,
        budgetItem: {
          include: {
            definition: true
          }
        },
      },
      orderBy: { registeredAt: 'desc' },
    });

    return results.map((item) => ({
      id: item.id,
      budgetItemId: item.budgetItem.id,
      budgetItemName: item.budgetItem.definition.name,

      userId: item.user.id,
      userName: `${item.user.firstName} ${item.user.lastName}`,

      oldAmount: item.oldAmount,
      newAmount: item.newAmount,
      percentageChange: item.percentageChange,

      percentageChangeText: (item.percentageChange) + ' %',

      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY')

    }));

  }
}