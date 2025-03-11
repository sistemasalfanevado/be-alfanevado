import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Importa PrismaService
import { CreateContentSliderDto } from './dto/create-content-slider.dto';
import { UpdateContentSliderDto } from './dto/update-content-slider.dto';

@Injectable()
export class ContentSliderService {
  constructor(private prisma: PrismaService) {} // Inyecta PrismaService

  async create(createContentSliderDto: CreateContentSliderDto) {
    return this.prisma.landingContentSlider.create({
      data: {
        title: createContentSliderDto.title,
        subtitle: createContentSliderDto.subtitle,
        linkImage1: createContentSliderDto.linkImage1,
        linkImage2: createContentSliderDto.linkImage2,
        linkImage3: createContentSliderDto.linkImage3,
        linkImage4: createContentSliderDto.linkImage4,
        nameImage1: createContentSliderDto.nameImage1,
        nameImage2: createContentSliderDto.nameImage2,
        nameImage3: createContentSliderDto.nameImage3,
        nameImage4: createContentSliderDto.nameImage4,
        page: {
          connect: { id: createContentSliderDto.pageId }, // Conecta con el page
        },
      },
    });
  }

  async findAll() {
    return this.prisma.landingContentSlider.findMany({
      where: { deletedAt: null }, // Solo registros no eliminados
    });
  }

  async findAllByPage(pageId: string) {
    return this.prisma.landingContentSlider.findMany({
      where: { deletedAt: null, pageId }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    return this.prisma.landingContentSlider.findUnique({
      where: { id, deletedAt: null }, // Solo si no está eliminado
    });
  }

  async update(id: string, updateContentSliderDto: UpdateContentSliderDto) {
    return this.prisma.landingContentSlider.update({
      where: { id },
      data: updateContentSliderDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingContentSlider.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingContentSlider.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}