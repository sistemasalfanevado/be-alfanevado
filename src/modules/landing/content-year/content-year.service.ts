import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Importa PrismaService
import { CreateContentYearDto } from './dto/create-content-year.dto';
import { UpdateContentYearDto } from './dto/update-content-year.dto';

@Injectable()
export class ContentYearService {
  constructor(private prisma: PrismaService) {} // Inyecta PrismaService

  async create(createContentYearDto: CreateContentYearDto) {
    return this.prisma.landingContentYear.create({
      data: {
        year: createContentYearDto.year,
        yearMessage: createContentYearDto.yearMessage,
        title: createContentYearDto.title,
        subtitle: createContentYearDto.subtitle,
        linkImage: createContentYearDto.linkImage,
        nameImage: createContentYearDto.nameImage,
        page: {
          connect: { id: createContentYearDto.pageId }, // Conecta con el page
        },
      },
    });
  }

  async findAll() {
    return this.prisma.landingContentYear.findMany({
      where: { deletedAt: null }, // Solo registros no eliminados
    });
  }

  async findAllByPage(pageId: string) {
    return this.prisma.landingContentYear.findMany({
      where: { deletedAt: null, pageId }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    return this.prisma.landingContentYear.findUnique({
      where: { id, deletedAt: null }, // Solo si no está eliminado
    });
  }

  async update(id: string, updateContentYearDto: UpdateContentYearDto) {
    return this.prisma.landingContentYear.update({
      where: { id },
      data: updateContentYearDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingContentYear.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingContentYear.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}