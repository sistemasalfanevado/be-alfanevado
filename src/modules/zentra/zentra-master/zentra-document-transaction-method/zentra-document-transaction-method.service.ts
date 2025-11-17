import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraDocumentTransactionMethodDto } from './dto/create-zentra-document-transaction-method.dto';
import { UpdateZentraDocumentTransactionMethodDto } from './dto/update-zentra-document-transaction-method.dto';

@Injectable()
export class ZentraDocumentTransactionMethodService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateZentraDocumentTransactionMethodDto) {
    return this.prisma.zentraDocumentTransactionMethod.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.zentraDocumentTransactionMethod.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraDocumentTransactionMethod.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, dto: UpdateZentraDocumentTransactionMethodDto) {
    return this.prisma.zentraDocumentTransactionMethod.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocumentTransactionMethod.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocumentTransactionMethod.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}