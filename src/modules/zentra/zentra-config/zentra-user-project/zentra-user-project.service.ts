import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraUserProjectDto } from './dto/create-zentra-user-project.dto';
import { UpdateZentraUserProjectDto } from './dto/update-zentra-user-project.dto';

@Injectable()
export class ZentraUserProjectService {
  constructor(private prisma: PrismaService) { }

  /**
   * Crea una relación usuario-proyecto
   */
  async create(createDto: CreateZentraUserProjectDto) {
    await this.prisma.zentraUserProject.create({
      data: {
        userId: createDto.userId,
        projectId: createDto.projectId,
      },
    });

    return { message: 'Acceso de usuario a proyecto registrado correctamente.' };
  }
  
  /**
   * Obtiene todas las relaciones usuario-proyecto activas
   */
  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraUserProject.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
        project: true,
      },
      orderBy: [
        { user: { lastName: 'asc' } },
        { project: { name: 'asc' } },
      ],
    });

    return results.map((item) => ({
      id: item.id,
      userId: item.userId,
      userName: `${item.user.firstName} ${item.user.lastName}`,
      projectId: item.projectId,
      projectName: item.project.name,
    }));
  }

  /**
   * Obtiene una relación específica por ID
   */
  async findOne(id: string) {
    return this.prisma.zentraUserProject.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: true,
        project: true,
      },
    });
  }

  /**
   * Actualiza los campos de una relación usuario-proyecto
   */
  async update(id: string, updateDto: UpdateZentraUserProjectDto) {
    return this.prisma.zentraUserProject.update({
      where: { id },
      data: {
        userId: updateDto.userId,
        projectId: updateDto.projectId,
      },
    });
  }

  /**
   * Eliminación lógica (soft delete)
   */
  async remove(id: string) {
    return this.prisma.zentraUserProject.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Restaura un registro eliminado lógicamente
   */
  async restore(id: string) {
    return this.prisma.zentraUserProject.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}