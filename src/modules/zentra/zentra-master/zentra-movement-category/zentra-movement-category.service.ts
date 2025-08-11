import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementCategoryDto } from './dto/create-zentra-movement-category.dto';
import { UpdateZentraMovementCategoryDto } from './dto/update-zentra-movement-category.dto';

@Injectable()
export class ZentraMovementCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraMovementCategoryDto: CreateZentraMovementCategoryDto) {
    return this.prisma.zentraMovementCategory.create({
      data: createZentraMovementCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.zentraMovementCategory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraMovementCategory.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraMovementCategoryDto: UpdateZentraMovementCategoryDto) {
    return this.prisma.zentraMovementCategory.update({
      where: { id },
      data: updateZentraMovementCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraMovementCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovementCategory.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}