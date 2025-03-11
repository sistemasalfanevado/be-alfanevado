import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateModuleSubModuleDto } from './dto/create-module-sub-module.dto';
import { UpdateModuleSubModuleDto } from './dto/update-module-sub-module.dto';

@Injectable()
export class ModuleSubModuleService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleSubModuleDto: CreateModuleSubModuleDto) {
    return this.prisma.moduleSubModule.create({
      data: createModuleSubModuleDto,
    });
  }

  async findAll() {
    return this.prisma.moduleSubModule.findMany();
  }

  async findOne(moduleId: string, subModuleId: string) {
    return this.prisma.moduleSubModule.findUnique({
      where: { moduleId_subModuleId: { moduleId, subModuleId } },
    });
  }

  async update(
    moduleId: string,
    subModuleId: string,
    updateModuleSubModuleDto: UpdateModuleSubModuleDto,
  ) {
    return this.prisma.moduleSubModule.update({
      where: { moduleId_subModuleId: { moduleId, subModuleId } },
      data: updateModuleSubModuleDto,
    });
  }

  async remove(moduleId: string, subModuleId: string) {
    return this.prisma.moduleSubModule.delete({
      where: { moduleId_subModuleId: { moduleId, subModuleId } },
    });
  }
}