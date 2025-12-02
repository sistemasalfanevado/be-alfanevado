import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraVisibilityDto } from './dto/create-zentra-visibility.dto';
import { UpdateZentraVisibilityDto } from './dto/update-zentra-visibility.dto';

@Injectable()
export class ZentraVisibilityService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraVisibilityDto: CreateZentraVisibilityDto) {
    return this.prisma.zentraVisibility.create({
      data: createZentraVisibilityDto,
    });
  }

  async findAll() {
    return this.prisma.zentraVisibility.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraVisibility.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraVisibilityDto: UpdateZentraVisibilityDto) {
    return this.prisma.zentraVisibility.update({
      where: { id },
      data: updateZentraVisibilityDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraVisibility.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraVisibility.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  

}