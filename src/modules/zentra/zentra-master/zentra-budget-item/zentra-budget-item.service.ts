import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemDto } from './dto/create-zentra-budget-item.dto';
import { UpdateZentraBudgetItemDto } from './dto/update-zentra-budget-item.dto';
import { VISIBIILITY } from 'src/shared/constants/app.constants';


@Injectable()
export class ZentraBudgetItemService {
  constructor(private prisma: PrismaService) { }

  // Crear un presupuesto
  async create(createDto: CreateZentraBudgetItemDto) {
    const { currencyId, definitionId, visibilityId, ...data } = createDto;

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
    const { currencyId, definitionId, visibilityId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (currencyId) updateData.currency = { connect: { id: currencyId } };
    if (definitionId) updateData.definition = { connect: { id: definitionId } };
    if (visibilityId) updateData.visibility = { connect: { id: visibilityId } };

    return this.prisma.zentraBudgetItem.update({
      where: { id },
      data: updateData,
      include: {
        currency: true,
        definition: true,
        visibility: true,
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


  private mapToDto(item: any) {
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

      budgetSubCategoryId: item?.definition?.category
        ? `${item.definition.category.id}`
        : null,

      budgetCategoryName: item?.definition?.category?.budgetCategory
        ? `${item.definition.category.budgetCategory.name}`
        : null,

      budgetCategoryId: item?.definition?.category?.budgetCategory
        ? `${item.definition.category.budgetCategory.id}`
        : null,

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

      natureId: item?.definition?.nature?.id || '',
      natureName: item?.definition?.nature?.name || '',

      idFirebase: item.idFirebase,
    };

    return base;
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null, visibilityId: VISIBIILITY.VISIBLE },
      include: {
        currency: true,
        definition: {
          include: {
            project: true
          }
        },
        visibility: true,
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item));
  }

  async findAllComplete(): Promise<any[]> {
    const results = await this.prisma.zentraBudgetItem.findMany({
      where: { deletedAt: null },
      include: {
        currency: true,
        definition: {
          include: {
            project: true
          }
        },
        visibility: true,
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item));
  }

  async findAllCompleteByProject(projectId: string): Promise<any[]> {
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
        visibility: true,
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
      where: { deletedAt: null, definition: { projectId }, visibilityId: VISIBIILITY.VISIBLE },
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
            nature: true 
          },
        },
        visibility: true,
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
      where: { deletedAt: null, definition: { project: { companyId } }, visibilityId: VISIBIILITY.VISIBLE },
      include: {
        currency: true,
        definition: {
          include: {
            project: true,
            nature: true
          }
        },
        visibility: true,
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
      where: { deletedAt: null, definition: { categoryId, projectId }, visibilityId: VISIBIILITY.VISIBLE },
      include: {
        currency: true,
        definition: {
          include: {
            category: true,
            project: true
          }
        },
        visibility: true
      },
      orderBy: [
        { definition: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
    });

    return results.map((item) => this.mapToDto(item));
  }


  async findByFilters(filters: { natureId?: string; projectId?: string }) {
    const { natureId, projectId } = filters;

    const where: any = {
      deletedAt: null,
      visibilityId: VISIBIILITY.VISIBLE,
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
        visibility: true,
      },
    });

    return results.map((item) => this.mapToDto(item));
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