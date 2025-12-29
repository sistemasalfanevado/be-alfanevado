import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentrPettyCashStatusDto } from './dto/create-zentra-petty-cash-status.dto';
import { UpdateZentrPettyCashStatusDto } from './dto/update-zentra-petty-cash-status.dto';

@Injectable()
export class ZentraPettyCashStatusService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateZentrPettyCashStatusDto) {
    await this.prisma.zentrPettyCashStatus.create({
      data: dto,
    });

    return {
      message: 'Petty Cash Status creado correctamente',
    };
  }

  async findAll() {
    return this.prisma.zentrPettyCashStatus.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentrPettyCashStatus.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, dto: UpdateZentrPettyCashStatusDto) {
    return this.prisma.zentrPettyCashStatus.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentrPettyCashStatus.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentrPettyCashStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}