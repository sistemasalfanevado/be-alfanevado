import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectDto } from './dto/create-zentra-project.dto';
import { UpdateZentraProjectDto } from './dto/update-zentra-project.dto';

@Injectable()
export class ZentraProjectService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraProjectDto: CreateZentraProjectDto) {
    return this.prisma.zentraProject.create({
      data: {
        name: createZentraProjectDto.name,
        company: {
          connect: { id: createZentraProjectDto.companyId }
        }
      },
      include: {
        company: true
      }
    });
  }

  async findAll() {
    return this.prisma.zentraProject.findMany({
      where: { deletedAt: null },
      include: { company: true }
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraProject.findUnique({
      where: { id, deletedAt: null },
      include: { company: true }
    });
  }

  async update(id: string, updateZentraProjectDto: UpdateZentraProjectDto) {
    const data: any = {
      name: updateZentraProjectDto.name
    };

    if (updateZentraProjectDto.companyId) {
      data.company = {
        connect: { id: updateZentraProjectDto.companyId }
      };
    }

    return this.prisma.zentraProject.update({
      where: { id },
      data,
      include: {
        company: true // Opcional
      }
    });
  }

  async remove(id: string) {
    return this.prisma.zentraProject.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraProject.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}