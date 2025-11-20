import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectIncomeDto } from './dto/create-zentra-project-income.dto';
import { UpdateZentraProjectIncomeDto } from './dto/update-zentra-project-income.dto';

@Injectable()
export class ZentraProjectIncomeService {
  constructor(private prisma: PrismaService) { }

  // Crear un nuevo registro
  async create(createDto: CreateZentraProjectIncomeDto) {
    return this.prisma.zentraProjectIncome.create({
      data: createDto,
    });
  }

  // Obtener todos los registros activos (deletedAt = null)
  async findAll() {
    const incomes = await this.prisma.zentraProjectIncome.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
      include: {
        project: { select: { name: true } },
        budgetItem: { select: { definition: { select: { name: true } } } },
      },
    });

    // Transformar para simplificar
    return incomes.map(i => ({
      id: i.id,
      projectId: i.projectId,
      budgetItemId: i.budgetItemId,
      projectName: i.project?.name ?? null,
      budgetItemDefinitionName: i.budgetItem?.definition?.name ?? null,
    }));
  }



  // Obtener un registro por ID
  async findOne(id: string) {
    return this.prisma.zentraProjectIncome.findUnique({
      where: { id },
    });
  }

  // Actualizar un registro
  async update(id: string, updateDto: UpdateZentraProjectIncomeDto) {
    return this.prisma.zentraProjectIncome.update({
      where: { id },
      data: updateDto,
    });
  }

  // Soft delete (marcar como eliminado)
  async remove(id: string) {
    return this.prisma.zentraProjectIncome.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Restaurar un registro eliminado
  async restore(id: string) {
    return this.prisma.zentraProjectIncome.update({
      where: { id },
      data: { deletedAt: null },
    });
  }


  async findAllByProject(projectId: string): Promise<any> {
    const results = await this.prisma.zentraProjectIncome.findMany({
      where: {
        deletedAt: null,
        projectId,
      },
      include: {
        budgetItem: {
          include: {
            definition: true
          }
        },
        project: true,
      },
    });

    // Si no hay resultados, devolver objeto vacío con valores vacíos
    if (!results || results.length === 0) {
      return {
        projectName: '',
        projectId,
        budgetItemName: '',
        budgetItemId: '',
      };
    }

    // Si hay resultados, devolvemos el primero
    const item = results[0];

    return {
      projectName: item.project?.name ?? '',
      projectId: item.project?.id ?? projectId,
      budgetItemName: item.budgetItem?.definition?.name ?? '',
      budgetItemId: item.budgetItem?.id ?? '',
    };
  }
  
}