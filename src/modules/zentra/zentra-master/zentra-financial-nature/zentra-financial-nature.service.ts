import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraFinancialNatureDto } from './dto/create-zentra-financial-nature.dto';
import { UpdateZentraFinancialNatureDto } from './dto/update-zentra-financial-nature.dto';

@Injectable()
export class ZentraFinancialNatureService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraFinancialNatureDto) {
    const { movementCategoryId, ...data } = createDto;

    await this.prisma.zentraFinancialNature.create({
      data: {
        ...data,
        movementCategory: { connect: { id: movementCategoryId } },
      },
    });

    return { message: 'Naturaleza financiera creada exitosamente' };
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraFinancialNature.findMany({
      where: { deletedAt: null },
      include: {
        movementCategory: true,
      },
      orderBy: { name: 'asc' },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      movementCategoryId: item.movementCategory.id,
      movementCategoryName: item.movementCategory.name,
      idFirebase: item.idFirebase,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraFinancialNature.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        movementCategory: {
          select: { id: true, name: true }, // Solo lo necesario
        },
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraFinancialNatureDto) {
    const { movementCategoryId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (movementCategoryId) {
      updateData.movementCategory = { connect: { id: movementCategoryId } };
    }

    await this.prisma.zentraFinancialNature.update({
      where: { id },
      data: updateData,
    });

    return { success: true, message: 'Nature actualizada con éxito' };
  }

  async remove(id: string) {
    await this.prisma.zentraFinancialNature.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true, message: 'Nature eliminada con éxito' };
  }

  async restore(id: string) {
    await this.prisma.zentraFinancialNature.update({
      where: { id },
      data: { deletedAt: null },
    });
    return { success: true, message: 'Nature restaurada con éxito' };
  }
}