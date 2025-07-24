import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraRoleDto } from './dto/create-zentra-role.dto';
import { UpdateZentraRoleDto } from './dto/update-zentra-role.dto';

@Injectable()
export class ZentraRoleService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraRoleDto: CreateZentraRoleDto) {
    return this.prisma.zentraRole.create({
      data: {
        name: createZentraRoleDto.name,
        description: createZentraRoleDto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.zentraRole.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraRole.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraRoleDto: UpdateZentraRoleDto) {
    return this.prisma.zentraRole.update({
      where: { id },
      data: updateZentraRoleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraRole.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.zentraRole.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}