import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPercentageDto } from './dto/create-zentra-percentage.dto';
import { UpdateZentraPercentageDto } from './dto/update-zentra-percentage.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ZentraPercentageService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraPercentageDto) {
    return this.prisma.zentraPercentage.create({
      data: {
        amount: new Prisma.Decimal(createDto.amount),
      },
    });
  }

  async findAll() {
    return this.prisma.zentraPercentage.findMany({
      where: { deletedAt: null },
      orderBy: { amount: 'asc' },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.zentraPercentage.findFirst({
      where: { id, deletedAt: null },
    });

    if (!record) {
      throw new NotFoundException(`El porcentaje con ID ${id} no existe o fue eliminado`);
    }

    return record;
  }

  async update(id: string, updateDto: UpdateZentraPercentageDto) {
    // Primero verificamos que exista
    await this.findOne(id);

    return this.prisma.zentraPercentage.update({
      where: { id },
      data: {
        ...updateDto,
        amount: updateDto.amount ? new Prisma.Decimal(updateDto.amount) : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    return this.prisma.zentraPercentage.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    const record = await this.prisma.zentraPercentage.findUnique({ where: { id } });
    
    if (!record) throw new NotFoundException('Registro no encontrado');

    return this.prisma.zentraPercentage.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}