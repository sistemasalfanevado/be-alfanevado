import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraSaleTypeDto } from './dto/create-zentra-sale-type.dto';
import { UpdateZentraSaleTypeDto } from './dto/update-zentra-sale-type.dto';

@Injectable()
export class ZentraSaleTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraSaleTypeDto: CreateZentraSaleTypeDto) {
    return this.prisma.zentraSaleType.create({
      data: createZentraSaleTypeDto,
    });
  }

  async findAll() {
    return this.prisma.zentraSaleType.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraSaleType.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateZentraSaleTypeDto: UpdateZentraSaleTypeDto) {
    return this.prisma.zentraSaleType.update({
      where: { id },
      data: updateZentraSaleTypeDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraSaleType.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraSaleType.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}