import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraInstallmentStatusDto } from './dto/create-zentra-installment-status.dto';
import { UpdateZentraInstallmentStatusDto } from './dto/update-zentra-installment-status.dto';

@Injectable()
export class ZentraInstallmentStatusService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraInstallmentStatusDto: CreateZentraInstallmentStatusDto) {
    return this.prisma.zentraInstallmentStatus.create({
      data: createZentraInstallmentStatusDto,
    });
  }

  async findAll() {
    return this.prisma.zentraInstallmentStatus.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraInstallmentStatus.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateZentraInstallmentStatusDto: UpdateZentraInstallmentStatusDto) {
    return this.prisma.zentraInstallmentStatus.update({
      where: { id },
      data: updateZentraInstallmentStatusDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraInstallmentStatus.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraInstallmentStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}