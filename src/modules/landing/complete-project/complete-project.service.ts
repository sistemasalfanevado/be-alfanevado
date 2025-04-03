import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCompleteProjectDto } from './dto/create-complete-project.dto';
import { UpdateCompleteProjectDto } from './dto/update-complete-project.dto';

@Injectable()
export class CompleteProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompleteProjectDto) {
    return this.prisma.landingCompleteProject.create({ data });
  }

  async findAll() {
    return this.prisma.landingCompleteProject.findMany({
      where: { deletedAt: null },
      orderBy: { position: 'asc' }, // Se ordenan por posición
    });
  }

  async findAllByPage(pageId: string) {
    return this.prisma.landingHeroBanner.findMany({
      where: { deletedAt: null, pageId }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.landingCompleteProject.findUnique({
      where: { id, deletedAt: null },
    });
    if (!project) throw new NotFoundException('Proyecto no encontrado');
    return project;
  }

  async update(id: string, data: UpdateCompleteProjectDto) {
    return this.prisma.landingCompleteProject.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.landingCompleteProject.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  

  async restore(id: string) {
    return this.prisma.landingCompleteProject.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}