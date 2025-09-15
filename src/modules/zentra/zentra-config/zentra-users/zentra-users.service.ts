import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { ZentraCreateUserDto } from './dto/zentra-create-user.dto';
import { ZentraUpdateUserDto } from './dto/zentra-update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ZentraUsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: ZentraCreateUserDto) {
    const { email, password, firstName, lastName, profileUrl, mainRoute, roleId, genreId } = createUserDto;

    const existingUser = await this.prisma.zentraUser.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El email ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.zentraUser.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profileUrl,
        mainRoute,
        roleId,
        genreId,
      },
    });

    return user;
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraUser.findMany({
      where: { deletedAt: null },
      include: {
        role: true,
        genre: true,
      }
    });

    return results.map((item) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      profileUrl: item.profileUrl,
      mainRoute: item.mainRoute,

      roleId: item.role.id,
      roleName: item.role.name,

      genreId: item.genre?.id ?? null,
      genreName: item.genre?.name ?? null,

      completeName: item.firstName + ' ' + item.lastName,

      idFirebase: item.idFirebase,

    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraUser.findUnique({
      where: { id, deletedAt: null }
    });
  }

  async update(id: string, zentraUpdateUserDto: ZentraUpdateUserDto) {
    return this.prisma.zentraUser.update({
      where: { id },
      data: zentraUpdateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraUser.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.zentraUser.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }



  async findByEmail(email: string) {
    const user = await this.prisma.zentraUser.findFirst({
      where: { email, deletedAt: null }, // Usuario activo
      include: {
        role: {
          include: {
            permissions: {
              where: { deletedAt: null },
              include: {
                page: {
                  include: {
                    pageGroup: true, // no se puede filtrar aquí
                  },
                },
              },
            },
            roleActions: {
              where: { deletedAt: null },
              include: {
                action: true, // 👈 traemos la acción asociada
              },
            },
          },
        },
        genre: true,
      },
    });

    if (!user) return null;

    // 🔹 Filtrar manualmente pageGroup y genre porque son belongsTo
    user.role.permissions = user.role.permissions.filter(
      (perm) => perm.page?.pageGroup?.deletedAt === null
    );

    if (user.genre?.deletedAt) {
      user.genre = null;
    }

    return user;
  }


}