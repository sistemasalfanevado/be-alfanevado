import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraRolePermissionDto } from './dto/create-zentra-role-permission.dto';
import { UpdateZentraRolePermissionDto } from './dto/update-zentra-role-permission.dto';

@Injectable()
export class ZentraRolePermissionService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraRolePermissionDto) {
    // Validación manual por el constraint único
    const existing = await this.prisma.zentraRolePermission.findFirst({
      where: {
        roleId: createDto.roleId,
        pageId: createDto.pageId,
        deletedAt: null,
      },
    });

    if (existing) {
      throw new ConflictException('Ya existe un permiso para este rol y página');
    }

    return this.prisma.zentraRolePermission.create({
      data: {
        roleId: createDto.roleId,
        pageId: createDto.pageId,
        canCreate: createDto.canCreate,
        canEdit: createDto.canEdit,
        canDelete: createDto.canDelete,
      },
    });
  }
  
  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraRolePermission.findMany({
      where: { deletedAt: null },
      include: {
        page: true,
        role: true,
      }
    });

    return results.map((item) => ({
      id: item.id,
      
      pageId: item.page.id,
      pageName: item.page.name,

      roleId: item.role.id,
      roleName: item.role.name,

    }));
  }





  async findOne(id: string) {
    return this.prisma.zentraRolePermission.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraRolePermissionDto) {
    return this.prisma.zentraRolePermission.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraRolePermission.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraRolePermission.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}