import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementBudgetConfigDto } from './dto/create-zentra-movement-budget-config.dto';
import { UpdateZentraMovementBudgetConfigDto } from './dto/update-zentra-movement-budget-config.dto';

@Injectable()
export class ZentraMovementBudgetConfigService {
  constructor(private prisma: PrismaService) { }

  // Crear un nuevo registro
  async create(createDto: CreateZentraMovementBudgetConfigDto) {
    return this.prisma.zentraMovementBudgetConfig.create({
      data: createDto,
    });
  }

  async findAll() {
    const incomes = await this.prisma.zentraMovementBudgetConfig.findMany({
      where: { deletedAt: null },
      include: {
        budgetItem: {
          include: {
            definition: true
          }
        },
        movementCategory: true
      },
    });

    return incomes.map(i => ({
      id: i.id,
      budgetItemId: i.budgetItem?.id,
      budgetItemName: i.budgetItem?.definition?.name ?? null,
      movementCategoryId: i.movementCategory?.id,
      movementCategoryName: i.movementCategory?.name ?? null,
    }));
  }



  // Obtener un registro por ID
  async findOne(id: string) {
    return this.prisma.zentraMovementBudgetConfig.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDto: UpdateZentraMovementBudgetConfigDto) {
    return this.prisma.zentraMovementBudgetConfig.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraMovementBudgetConfig.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovementBudgetConfig.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
  
  async findAllByProject(projectId: string): Promise<any> {
    const results = await this.prisma.zentraMovementBudgetConfig.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: {
            projectId: projectId
          }
        },
      },
      include: {
        budgetItem: {
          include: {
            definition: true
          }
        },
        movementCategory: true
      },
    });

    return results.map(i => ({
      id: i.id,
      budgetItemId: i.budgetItem?.id,
      budgetItemName: i.budgetItem?.definition?.name ?? null,
      movementCategoryId: i.movementCategory?.id,
      movementCategoryName: i.movementCategory?.name ?? null,
    }));

  }

}