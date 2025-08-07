import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { ZentraCreateUserDto } from './dto/zentra-create-user.dto';
import { ZentraUpdateUserDto } from './dto/zentra-update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ZentraUsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: ZentraCreateUserDto) {
    const { email, password, firstName, lastName, gender, profileUrl, roleId } = createUserDto;

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
        gender,
        profileUrl,
        roleId,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.zentraUser.findUnique({ where: { email } });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraUser.findMany({
      where: { deletedAt: null },
      include: {
        role: true,
      }
    });

    return results.map((item) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      gender: item.gender,
      profileUrl: item.gender,

      roleId: item.role.id,
      roleName: item.role.name,

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
    if (zentraUpdateUserDto.password) {
      zentraUpdateUserDto.password = await bcrypt.hash(zentraUpdateUserDto.password, 10);
    }

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
}