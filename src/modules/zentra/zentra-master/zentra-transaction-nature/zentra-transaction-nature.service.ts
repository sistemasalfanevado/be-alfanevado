import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraTransactionNatureDto } from './dto/create-zentra-transaction-nature.dto';
import { UpdateZentraTransactionNatureDto } from './dto/update-zentra-transaction-nature.dto';

@Injectable()
export class ZentraTransactionNatureService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraTransactionNatureDto: CreateZentraTransactionNatureDto) {
    return this.prisma.zentraTransactionNature.create({
      data: createZentraTransactionNatureDto,
    });
  }

  async findAll() {
    return this.prisma.zentraTransactionNature.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraTransactionNature.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraTransactionNatureDto: UpdateZentraTransactionNatureDto) {
    return this.prisma.zentraTransactionNature.update({
      where: { id },
      data: updateZentraTransactionNatureDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraTransactionNature.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraTransactionNature.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}