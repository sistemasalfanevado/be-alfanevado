import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementStatusDto } from './dto/create-zentra-movement-status.dto';
import { UpdateZentraMovementStatusDto } from './dto/update-zentra-movement-status.dto';

@Injectable()
export class ZentraMovementStatusService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraMovementStatusDto: CreateZentraMovementStatusDto) {
    return this.prisma.zentraMovementStatus.create({
      data: createZentraMovementStatusDto,
    });
  }

  async findAll() {
    return this.prisma.zentraMovementStatus.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraMovementStatus.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraMovementStatusDto: UpdateZentraMovementStatusDto) {
    return this.prisma.zentraMovementStatus.update({
      where: { id },
      data: updateZentraMovementStatusDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraMovementStatus.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovementStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}