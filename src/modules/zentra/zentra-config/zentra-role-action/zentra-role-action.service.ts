import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraRoleActionDto } from './dto/create-zentra-role-action.dto';
import { UpdateZentraRoleActionDto } from './dto/update-zentra-role-action.dto';

@Injectable()
export class ZentraRoleActionService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraRoleActionDto) {
    // Validación manual por constraint único (roleId + actionId)
    const existing = await this.prisma.zentraRoleAction.findFirst({
      where: {
        roleId: createDto.roleId,
        actionId: createDto.actionId,
        deletedAt: null,
      },
    });

    if (existing) {
      throw new ConflictException('Ya existe una acción para este rol');
    }

    return this.prisma.zentraRoleAction.create({
      data: {
        roleId: createDto.roleId,
        actionId: createDto.actionId,
      },
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraRoleAction.findMany({
      where: { deletedAt: null },
      include: {
        action: true,
        role: true,
      },
      orderBy: [
        { role: { name: 'asc' } },
        { action: { name: 'asc' } },
      ],
    });

    return results.map((item) => ({
      id: item.id,
      actionId: item.action.id,
      actionName: item.action.name,
      roleId: item.role.id,
      roleName: item.role.name,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraRoleAction.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraRoleActionDto) {
    return this.prisma.zentraRoleAction.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraRoleAction.update({
      where: { id },
      data: { deletedAt: new Date() }, // soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.zentraRoleAction.update({
      where: { id },
      data: { deletedAt: null }, // restaurar
    });
  }
}