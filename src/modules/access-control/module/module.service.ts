import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto) {
    return this.prisma.module.create({
      data: createModuleDto,
    });
  }

  async findAll() {
    return this.prisma.module.findMany();
  }

  async findOne(id: string) {
    return this.prisma.module.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    return this.prisma.module.update({
      where: { id },
      data: updateModuleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.module.delete({
      where: { id },
    });
  }
}