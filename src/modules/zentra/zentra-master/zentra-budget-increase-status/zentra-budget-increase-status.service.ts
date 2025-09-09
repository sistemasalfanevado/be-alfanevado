import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetIncreaseStatusDto } from './dto/create-zentra-budget-increase-status.dto';
import { UpdateZentraBudgetIncreaseStatusDto } from './dto/update-zentra-budget-increase-status.dto';

@Injectable()
export class ZentraBudgetIncreaseStatusService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraBudgetIncreaseStatusDto) {
    await this.prisma.zentraBudgetIncreaseStatus.create({
      data: createDto,
    });

    return { message: 'Registrado correctamente' };
  }

  async findAll() {
    return this.prisma.zentraBudgetIncreaseStatus.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetIncreaseStatus.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetIncreaseStatusDto) {
    return this.prisma.zentraBudgetIncreaseStatus.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetIncreaseStatus.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetIncreaseStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}