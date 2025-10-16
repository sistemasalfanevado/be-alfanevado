import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraScheduledIncomeDocumentStatusDto } from './dto/create-zentra-scheduled-income-document-status.dto';
import { UpdateZentraScheduledIncomeDocumentStatusDto } from './dto/update-zentra-scheduled-income-document-status.dto';

@Injectable()
export class ZentraScheduledIncomeDocumentStatusService {
  constructor(private readonly prisma: PrismaService) {}

  // 🟢 Crear nuevo estado
  async create(createDto: CreateZentraScheduledIncomeDocumentStatusDto) {
    return await this.prisma.zentraScheduledIncomeDocumentStatus.create({
      data: {
        name: createDto.name,
      },
    });
  }

  // 🟡 Obtener todos los estados activos
  async findAll() {
    return await this.prisma.zentraScheduledIncomeDocumentStatus.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
  }

  // 🔵 Obtener un estado por ID
  async findOne(id: string) {
    const status = await this.prisma.zentraScheduledIncomeDocumentStatus.findUnique({
      where: { id },
    });

    if (!status || status.deletedAt) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    return status;
  }

  // 🟠 Actualizar un estado
  async update(id: string, updateDto: UpdateZentraScheduledIncomeDocumentStatusDto) {
    const existing = await this.findOne(id);

    return await this.prisma.zentraScheduledIncomeDocumentStatus.update({
      where: { id: existing.id },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  // 🔴 Soft delete
  async remove(id: string) {
    const existing = await this.findOne(id);

    return await this.prisma.zentraScheduledIncomeDocumentStatus.update({
      where: { id: existing.id },
      data: { deletedAt: new Date() },
    });
  }

  // 🟣 Restaurar (soft restore)
  async restore(id: string) {
    const existing = await this.prisma.zentraScheduledIncomeDocumentStatus.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    return await this.prisma.zentraScheduledIncomeDocumentStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}