import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetIncreaseRequestDto } from './dto/create-zentra-budget-increase-request.dto';
import { UpdateZentraBudgetIncreaseRequestDto } from './dto/update-zentra-budget-increase-request.dto';

@Injectable()
export class ZentraBudgetIncreaseRequestService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraBudgetIncreaseRequestDto) {
    await this.prisma.zentraBudgetIncreaseRequest.create({
      data: createDto,
    });

    return { message: 'Registrado correctamente' };
  }

  async findAll() {
    return this.prisma.zentraBudgetIncreaseRequest.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        registeredAt: 'desc',
      },
      include: {
        budgetItem: true,
        currency: true,
        user: true,
        status: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetIncreaseRequest.findFirst({
      where: { id, deletedAt: null },
      include: {
        budgetItem: true,
        currency: true,
        user: true,
        status: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetIncreaseRequestDto) {
    return this.prisma.zentraBudgetIncreaseRequest.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetIncreaseRequest.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetIncreaseRequest.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}