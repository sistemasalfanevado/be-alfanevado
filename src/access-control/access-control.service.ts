import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccessControlService {
  constructor(private prisma: PrismaService) {}

  async getUserModulesAndSubModules(userId: string) {
    const userModules = await this.prisma.userModule.findMany({
      where: { userId },
      include: {
        module: {
          include: {
            subModules: {
              include: {
                subModule: true,
              },
            },
          },
        },
      },
    });

    // Formatear la respuesta
    return userModules.map((userModule) => ({
      module: userModule.module.name,
      subModules: userModule.module.subModules.map(
        (moduleSubModule) => moduleSubModule.subModule.name,
      ),
    }));
  }
}