import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetItemDefinitionDto } from './dto/create-zentra-budget-item-definition.dto';
import { UpdateZentraBudgetItemDefinitionDto } from './dto/update-zentra-budget-item-definition.dto';
import { VISIBIILITY } from 'src/shared/constants/app.constants';


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
      where: { deletedAt: null, visibilityId: VISIBIILITY.VISIBLE },
      include: {
        category: true,
        project: true,
        nature: true,
        visibility: true,
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

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

      idFirebase: item.idFirebase,
    }));
  }

  async findAllComplete() {
    const results = await this.prisma.zentraBudgetItemDefinition.findMany({
      where: { deletedAt: null },
      include: {
        category: true,
        project: true,
        nature: true,
        visibility: true,
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

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

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


  async findAllCompleteByProject(projectId: string) {
    const results = await this.prisma.zentraBudgetItemDefinition.findMany({
      where: { deletedAt: null, projectId },
      include: {
        category: true,
        project: true,
        nature: true,
        visibility: true,
      },
      orderBy: [
        { nature: { name: 'asc' } },   // 1. Primero por Naturaleza
        { category: { name: 'asc' } }, // 2. Luego por Categoría
        { name: 'asc' },               // 3. Finalmente por el Nombre del item
      ],
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

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

      idFirebase: item.idFirebase,
    }));
  }

  async findAllByProject(projectId: string) {
    const results = await this.prisma.zentraBudgetItemDefinition.findMany({
      where: { deletedAt: null, projectId, visibilityId: VISIBIILITY.VISIBLE },
      include: {
        category: true,
        project: true,
        nature: true,
        visibility: true,
      },
      // El orden de los factores sí altera el producto aquí:
      orderBy: [
        { nature: { name: 'asc' } },   // 1. Primero por Naturaleza
        { category: { name: 'asc' } }, // 2. Luego por Categoría
        { name: 'asc' },               // 3. Finalmente por el Nombre del item
      ],
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

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

      idFirebase: item.idFirebase,
    }));
  }




  async findAllByCompany(companyId: string) {
    const results = await this.prisma.zentraBudgetItemDefinition.findMany({
      where: {
        deletedAt: null,
        project: {
          companyId
        },
        visibilityId: VISIBIILITY.VISIBLE
      },
      include: {
        category: true,
        project: true,
        nature: true,
        visibility: true,
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

      completeName: item.project.name + ' - ' + item.name,

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

      idFirebase: item.idFirebase,
    }));
  }

}