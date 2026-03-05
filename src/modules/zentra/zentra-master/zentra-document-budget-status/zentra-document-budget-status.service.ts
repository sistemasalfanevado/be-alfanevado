import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentBudgetStatusDto } from './dto/create-zentra-document-budget-status.dto';
import { UpdateZentraDocumentBudgetStatusDto } from './dto/update-zentra-document-budget-status.dto';

@Injectable()
export class ZentraDocumentBudgetStatusService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraDocumentBudgetStatusDto) {
    await this.prisma.zentraDocumentBudgetStatus.create({
      data: createDto,
    });

    return { message: 'Registrado correctamente' };
  }

  async findAll() {
    return this.prisma.zentraDocumentBudgetStatus.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraDocumentBudgetStatus.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraDocumentBudgetStatusDto) {
    return this.prisma.zentraDocumentBudgetStatus.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocumentBudgetStatus.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocumentBudgetStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}