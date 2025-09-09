import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemDto } from './dto/create-zentra-budget-item.dto';
import { UpdateZentraBudgetItemDto } from './dto/update-zentra-budget-item.dto';

@Injectable()
export class ZentraBudgetItemService {
  constructor(private prisma: PrismaService) { }

  // Crear un presupuesto
  async create(createDto: CreateZentraBudgetItemDto) {
    const { currencyId, definitionId, ...data } = createDto;

    await this.prisma.zentraBudgetItem.create({
      data: createDto,
    });

  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null },
      include: {
        currency: true,
        definition: true
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } }
      ]
    });

    return results.map((item) => ({
      id: item.id,
      amount: item.amount,

      executedAmount: item.executedAmount,
      executedSoles: item.executedSoles,
      executedDolares: item.executedDolares,

      definitionId: item.definition.id,
      definitionName: item.definition.name,

      currencyId: item.currency.id,
      currencyName: item.currency.name,

      completeName: item.definition.name + ' - ' + item.currency.name
    }));
  }

  async findAllByProject(projectId: string): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: {
        deletedAt: null,
        definition: {
          projectId: projectId
        }
      },
      include: {
        currency: true,
        definition: true
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } }
      ]
    });

    return results.map((item) => {
      const available = Number(item.amount) - Number(item.executedAmount);

      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return {
        id: item.id,
        amount: item.amount,
        executedAmount: item.executedAmount,
        executedSoles: item.executedSoles,
        executedDolares: item.executedDolares,

        definitionId: item.definition.id,
        definitionName: item.definition.name,

        currencyId: item.currency.id,
        currencyName: item.currency.name,

        available: available,
        
        completeName: `${item.definition.name} - ${item.currency.name} - ${formatter.format(available)}`,
      };
    });


  }

  // Obtener un presupuesto específico
  async findOne(id: string) {
    return this.prisma.zentraBudgetItem.findUnique({
      where: { id },
      include: {
        currency: true,
        definition: true,
        documents: true,
        movements: true
      }
    });
  }

  // Actualizar un presupuesto
  async update(id: string, updateDto: UpdateZentraBudgetItemDto) {
    const { currencyId, definitionId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (currencyId) updateData.currency = { connect: { id: currencyId } };
    if (definitionId) updateData.definition = { connect: { id: definitionId } };

    return this.prisma.zentraBudgetItem.update({
      where: { id },
      data: updateData,
      include: {
        currency: true,
        definition: true
      }
    });
  }

  // Eliminación lógica
  async remove(id: string) {
    return this.prisma.zentraBudgetItem.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  // Restaurar un presupuesto
  async restore(id: string) {
    return this.prisma.zentraBudgetItem.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
}