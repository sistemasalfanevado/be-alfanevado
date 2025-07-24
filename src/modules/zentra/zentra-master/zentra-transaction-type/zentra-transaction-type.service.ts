import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraTransactionTypeDto } from './dto/create-zentra-transaction-type.dto';
import { UpdateZentraTransactionTypeDto } from './dto/update-zentra-transaction-type.dto';

@Injectable()
export class ZentraTransactionTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraTransactionTypeDto: CreateZentraTransactionTypeDto) {
    return this.prisma.zentraTransactionType.create({
      data: createZentraTransactionTypeDto,
    });
  }

  async findAll() {
    return this.prisma.zentraTransactionType.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraTransactionType.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraTransactionTypeDto: UpdateZentraTransactionTypeDto) {
    return this.prisma.zentraTransactionType.update({
      where: { id },
      data: updateZentraTransactionTypeDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraTransactionType.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraTransactionType.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}