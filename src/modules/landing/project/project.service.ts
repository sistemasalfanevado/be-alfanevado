import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Importa PrismaService
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {} // Inyecta PrismaService

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.landingProject.create({
      data: {
        position: createProjectDto.position,
        linkImage1: createProjectDto.linkImage1,
        linkImage2: createProjectDto.linkImage2,
        nameImage1: createProjectDto.nameImage1,
        nameImage2: createProjectDto.nameImage2,
        title: createProjectDto.title,
        subtitle: createProjectDto.subtitle,
        textButton: createProjectDto.textButton,
        linkRedirect1: createProjectDto.linkRedirect1,
        linkRedirect2: createProjectDto.linkRedirect2,
        page: {
          connect: { id: createProjectDto.pageId }, // Conecta con el page
        },
      },
    });
  }

  async findAll() {
    return this.prisma.landingProject.findMany({
      where: { deletedAt: null }, // Solo registros no eliminados
    });
  }

  async findAllByPage(pageId: string) {
    return this.prisma.landingProject.findMany({
      where: { deletedAt: null, pageId }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    return this.prisma.landingProject.findUnique({
      where: { id, deletedAt: null }, // Solo si no está eliminado
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.landingProject.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingProject.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingProject.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}