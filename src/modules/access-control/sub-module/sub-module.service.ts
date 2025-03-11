import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateSubModuleDto } from './dto/create-sub-module.dto';
import { UpdateSubModuleDto } from './dto/update-sub-module.dto';

@Injectable()
export class SubModuleService {
  constructor(private prisma: PrismaService) {}

  async create(createSubModuleDto: CreateSubModuleDto) {
    return this.prisma.subModule.create({
      data: createSubModuleDto,
    });
  }

  async findAll() {
    return this.prisma.subModule.findMany();
  }

  async findOne(id: string) {
    return this.prisma.subModule.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSubModuleDto: UpdateSubModuleDto) {
    return this.prisma.subModule.update({
      where: { id },
      data: updateSubModuleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.subModule.delete({
      where: { id },
    });
  }
}