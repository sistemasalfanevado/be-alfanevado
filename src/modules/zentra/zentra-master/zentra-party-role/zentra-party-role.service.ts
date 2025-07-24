import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyRoleDto } from './dto/create-zentra-party-role.dto';
import { UpdateZentraPartyRoleDto } from './dto/update-zentra-party-role.dto';

@Injectable()
export class ZentraPartyRoleService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraPartyRoleDto: CreateZentraPartyRoleDto) {
    return this.prisma.zentraPartyRole.create({
      data: createZentraPartyRoleDto,
    });
  }

  async findAll() {
    return this.prisma.zentraPartyRole.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        parties: true // Include related parties if needed
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraPartyRole.findUnique({
      where: { id, deletedAt: null },
      include: {
        parties: true // Include related parties if needed
      }
    });
  }

  async update(id: string, updateZentraPartyRoleDto: UpdateZentraPartyRoleDto) {
    return this.prisma.zentraPartyRole.update({
      where: { id },
      data: updateZentraPartyRoleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPartyRole.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPartyRole.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}