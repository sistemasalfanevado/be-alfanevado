import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraTelecreditoOperationStateDto } from './dto/create-zentra-telecredito-operation-state.dto';
import { UpdateZentraTelecreditoOperationStateDto } from './dto/update-zentra-telecredito-operation-state.dto';

@Injectable()
export class ZentraTelecreditoOperationStateService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraTelecreditoOperationStateDto) {
    return this.prisma.zentraTelecreditoOperationState.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.zentraTelecreditoOperationState.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraTelecreditoOperationState.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDto: UpdateZentraTelecreditoOperationStateDto) {
    return this.prisma.zentraTelecreditoOperationState.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraTelecreditoOperationState.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraTelecreditoOperationState.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}