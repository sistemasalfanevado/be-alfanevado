import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemDefinitionDto } from './dto/create-zentra-budget-item-definition.dto';
import { UpdateZentraBudgetItemDefinitionDto } from './dto/update-zentra-budget-item-definition.dto';

@Injectable()
export class ZentraBudgetItemDefinitionService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraBudgetItemDefinitionDto: CreateZentraBudgetItemDefinitionDto) {
    await this.prisma.zentraBudgetItemDefinition.create({
      data: createZentraBudgetItemDefinitionDto,
    });

    return { message: 'Definición de partida creada correctamente' };
  }

  async findAll() {
    const results = await this.prisma.zentraBudgetItemDefinition.findMany({
      where: { deletedAt: null },
      include: {
        category: true,
        project: true,
        nature: true, // 👈 incluimos la relación con BudgetNature
      },
      orderBy: {
        name: 'asc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,

      categoryId: item.category.id,
      categoryName: item.category.name,

      projectId: item.project.id,
      projectName: item.project.name,

      natureId: item.nature?.id ?? null,
      natureName: item.nature?.name ?? null,

      idFirebase: item.idFirebase,
    }));
  }

  async findOne(id: string) {
    const item = await this.prisma.zentraBudgetItemDefinition.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: true,
        project: true,
        nature: true,
      },
    });

    if (!item) return null;

    return {
      id: item.id,
      name: item.name,

      categoryId: item.category.id,
      categoryName: item.category.name,

      projectId: item.project.id,
      projectName: item.project.name,

      natureId: item.nature?.id ?? null,
      natureName: item.nature?.name ?? null,

      idFirebase: item.idFirebase,
    };
  }

  async update(id: string, updateZentraBudgetItemDefinitionDto: UpdateZentraBudgetItemDefinitionDto) {
    return this.prisma.zentraBudgetItemDefinition.update({
      where: { id },
      data: updateZentraBudgetItemDefinitionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetItemDefinition.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetItemDefinition.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

   async findAllByProject(projectId: string) {
    const results = await this.prisma.zentraBudgetItemDefinition.findMany({
      where: { deletedAt: null, projectId },
      include: {
        category: true,
        project: true,
        nature: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,

      categoryId: item.category.id,
      categoryName: item.category.name,

      projectId: item.project.id,
      projectName: item.project.name,

      natureId: item.nature?.id ?? null,
      natureName: item.nature?.name ?? null,

      idFirebase: item.idFirebase,
    }));
  }

}