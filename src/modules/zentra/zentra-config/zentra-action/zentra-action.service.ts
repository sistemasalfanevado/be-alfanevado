import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraActionDto } from './dto/create-zentra-action.dto';
import { UpdateZentraActionDto } from './dto/update-zentra-action.dto';

@Injectable()
export class ZentraActionService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraActionDto: CreateZentraActionDto) {
    return this.prisma.zentraAction.create({
      data: {
        name: createZentraActionDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.zentraAction.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraAction.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateZentraActionDto: UpdateZentraActionDto) {
    return this.prisma.zentraAction.update({
      where: { id },
      data: updateZentraActionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraAction.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.zentraAction.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar
    });
  }
}