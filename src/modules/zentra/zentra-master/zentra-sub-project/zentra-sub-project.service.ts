import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraSubProjectDto } from './dto/create-zentra-sub-project.dto';
import { UpdateZentraSubProjectDto } from './dto/update-zentra-sub-project.dto';

@Injectable()
export class ZentraSubProjectService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraSubProjectDto: CreateZentraSubProjectDto) {
    await this.prisma.zentraSubProject.create({
      data: {
        name: createZentraSubProjectDto.name,
        project: {
          connect: { id: createZentraSubProjectDto.projectId },
        },
      },
    });

    return { message: 'Subproyecto creado exitosamente.' };
  }

  async findAll() {
    const results = await this.prisma.zentraSubProject.findMany({
      where: { deletedAt: null },
      include: { project: true },
      orderBy: {
        name: 'asc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      projectId: item.project.id,
      projectName: item.project.name,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraSubProject.findUnique({
      where: { id, deletedAt: null },
      include: { project: true },
    });
  }

  async update(id: string, updateZentraSubProjectDto: UpdateZentraSubProjectDto) {
    const data: any = {
      name: updateZentraSubProjectDto.name,
    };

    if (updateZentraSubProjectDto.projectId) {
      data.project = {
        connect: { id: updateZentraSubProjectDto.projectId },
      };
    }

    return this.prisma.zentraSubProject.update({
      where: { id },
      data,
      include: { project: true },
    });
  }

  async remove(id: string) {
    return this.prisma.zentraSubProject.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraSubProject.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}