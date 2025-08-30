import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraGenreDto } from './dto/create-zentra-genre.dto';
import { UpdateZentraGenreDto } from './dto/update-zentra-genre.dto';

@Injectable()
export class ZentraGenreService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraGenreDto: CreateZentraGenreDto) {
    return this.prisma.zentraGenre.create({
      data: {
        name: createZentraGenreDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.zentraGenre.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraGenre.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraGenreDto: UpdateZentraGenreDto) {
    return this.prisma.zentraGenre.update({
      where: { id },
      data: updateZentraGenreDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraGenre.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.zentraGenre.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}