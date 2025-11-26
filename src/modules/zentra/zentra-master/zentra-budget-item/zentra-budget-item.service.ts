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


  private mapToDto(item: any, includeCategory = false) {
    const available =
      item.amount !== null && item.executedDolares !== null
        ? Number((Number(item.amount) - Number(Math.abs(item.executedDolares))).toFixed(2))
        : null;


    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const base = {
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
      completeName: `${item.definition.name} - ${item.currency.name}${available !== null ? ' - ' + formatter.format(available) : ''
        }`,
        
      projectName: `${item.definition.project.name}`,

      budgetSubCategoryName: item?.definition?.category
        ? `${item.definition.category.name}`
        : null,
      budgetCategoryName: item?.definition?.category?.budgetCategory
        ? `${item.definition.category.budgetCategory.name}`
        : null,

      idFirebase: item.idFirebase,
    };

    if (includeCategory && item.definition.category) {
      return {
        ...base,
        categoryId: item.definition.category.id,
        categoryName: item.definition.category.name,
      };
    }

    return base;
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null },
      include: {
        currency: true, definition: {
          include: {
            project: true
          }
        }
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item));
  }

  async findAllByProject(projectId: string): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null, definition: { projectId } },
      include: {
        currency: true,
        definition: {
          include: {
            project: true,
            category: {
              include: {
                budgetCategory: true
              }
            },
          },
        },
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item));
  }

  async findAllByCompany(companyId: string): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null, definition: { project: { companyId } } },
      include: {
        currency: true, definition: {
          include: {
            project: true
          }
        }
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item));
  }


  async findAllByCategory(categoryId: string, projectId: string): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null, definition: { categoryId, projectId } },
      include: {
        currency: true,
        definition: { include: { category: true, project: true } },
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item, true));
  }


  async findByFilters(filters: { natureId?: string; projectId?: string }) {
    const { natureId, projectId } = filters;

    const where: any = {
      deletedAt: null,
      definition: {},
    };

    if (natureId && natureId.trim() !== '') {
      where.definition.natureId = natureId;
    }

    if (projectId && projectId.trim() !== '') {
      where.definition.projectId = projectId;
    }

    const results = await this.prisma.zentraBudgetItem.findMany({
      where,
      include: {
        currency: true,
        definition: {
          include: {
            category: true,
            nature: true,
            project: true,
          },
        },
      },
    });

    return results.map((item) => this.mapToDto(item, true));
  }

  async findByFiltersExtra(filters: { projectId?: string }): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: {
        deletedAt: { not: null },
        definition: {
          projectId: filters.projectId
        }
      },
      include: {
        currency: true, definition: {
          include: {
            project: true
          }
        }
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item));
  }

}