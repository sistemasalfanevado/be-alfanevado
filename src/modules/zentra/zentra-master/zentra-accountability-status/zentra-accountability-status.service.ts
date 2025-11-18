import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraAccountabilityStatusDto } from './dto/create-zentra-accountability-status.dto';
import { UpdateZentraAccountabilityStatusDto } from './dto/update-zentra-accountability-status.dto';

@Injectable()
export class ZentraAccountabilityStatusService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateZentraAccountabilityStatusDto) {
    await this.prisma.zentraAccountabilityStatus.create({
      data: dto,
    });

    return {
      message: 'Accountability Status creado correctamente',
    };
  }

  async findAll() {
    return this.prisma.zentraAccountabilityStatus.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraAccountabilityStatus.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, dto: UpdateZentraAccountabilityStatusDto) {
    return this.prisma.zentraAccountabilityStatus.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraAccountabilityStatus.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraAccountabilityStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}