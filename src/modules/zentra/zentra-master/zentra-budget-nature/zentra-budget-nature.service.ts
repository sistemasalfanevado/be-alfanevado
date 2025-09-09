import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetNatureDto } from './dto/create-zentra-budget-nature.dto';
import { UpdateZentraBudgetNatureDto } from './dto/update-zentra-budget-nature.dto';

@Injectable()
export class ZentraBudgetNatureService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBudgetNatureDto) {
    await this.prisma.zentraBudgetNature.create({
      data: createDto,
    });

    return { message: 'Registrado correctamente' };
  }


  async findAll() {
    return this.prisma.zentraBudgetNature.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetNature.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetNatureDto) {
    return this.prisma.zentraBudgetNature.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetNature.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetNature.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}