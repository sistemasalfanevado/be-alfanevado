import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateZentraPageGroupDto } from './dto/create-zentra-page-group.dto';
import { UpdateZentraPageGroupDto } from './dto/update-zentra-page-group.dto';

@Injectable()
export class ZentraPageGroupService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraPageGroupDto: CreateZentraPageGroupDto) {
    return this.prisma.zentraPageGroup.create({
      data: {
        name: createZentraPageGroupDto.name,
        description: createZentraPageGroupDto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.zentraPageGroup.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraPageGroup.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraPageGroupDto: UpdateZentraPageGroupDto) {
    return this.prisma.zentraPageGroup.update({
      where: { id },
      data: updateZentraPageGroupDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPageGroup.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPageGroup.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}