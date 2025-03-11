import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';

@Injectable()
export class UserModuleService {
  constructor(private prisma: PrismaService) {}

  async create(createUserModuleDto: CreateUserModuleDto) {
    return this.prisma.userModule.create({
      data: createUserModuleDto,
    });
  }

  async findAll() {
    return this.prisma.userModule.findMany();
  }

  async findOne(userId: string, moduleId: string) {
    return this.prisma.userModule.findUnique({
      where: { userId_moduleId: { userId, moduleId } },
    });
  }

  async update(
    userId: string,
    moduleId: string,
    updateUserModuleDto: UpdateUserModuleDto,
  ) {
    return this.prisma.userModule.update({
      where: { userId_moduleId: { userId, moduleId } },
      data: updateUserModuleDto,
    });
  }

  async remove(userId: string, moduleId: string) {
    return this.prisma.userModule.delete({
      where: { userId_moduleId: { userId, moduleId } },
    });
  }
}