import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraAreaDto } from './dto/create-zentra-area.dto';
import { UpdateZentraAreaDto } from './dto/update-zentra-area.dto';

@Injectable()
export class ZentraAreaService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraAreaDto: CreateZentraAreaDto) {
    return this.prisma.zentraArea.create({
      data: createZentraAreaDto,
    });
  }

  async findAll() {
    return this.prisma.zentraArea.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraArea.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraAreaDto: UpdateZentraAreaDto) {
    return this.prisma.zentraArea.update({
      where: { id },
      data: updateZentraAreaDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraArea.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraArea.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}