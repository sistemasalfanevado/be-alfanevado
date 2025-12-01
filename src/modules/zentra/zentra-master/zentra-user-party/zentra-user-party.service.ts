import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraUserPartyDto } from './dto/create-zentra-user-party.dto';
import { UpdateZentraUserPartyDto } from './dto/update-zentra-user-party.dto';

@Injectable()
export class ZentraUserPartyService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraUserPartyDto) {
    await this.prisma.zentraUserParty.create({
      data: {
        user: { connect: { id: createDto.userId } },
        party: { connect: { id: createDto.partyId } },
      },
    });

    return { message: 'User Party creada exitosamente' };
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraUserParty.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
        party: true
      },
    });

    return results.map((item) => ({
      id: item.id,

      userId: item.user.id,
      userName: item.user.firstName + ' ' + item.user.lastName,
      partyId: item.party.id,
      partyName: item.party.name,

    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraUserParty.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        user: {
          select: { id: true, firstName: true, lastName: true },
        },
        party: {
          select: { id: true, name: true },
        },
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraUserPartyDto) {

    const updateData: any = {};

    if (updateDto.userId) {
      updateData.user = { connect: { id: updateDto.userId } };
    }

    if (updateDto.partyId) {
      updateData.party = { connect: { id: updateDto.partyId } };
    }

    await this.prisma.zentraUserParty.update({
      where: { id },
      data: updateData,
    });

    return { success: true, message: 'Nature actualizada con éxito' };
  }

  async remove(id: string) {
    await this.prisma.zentraUserParty.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true, message: 'Nature eliminada con éxito' };
  }

  async restore(id: string) {
    await this.prisma.zentraUserParty.update({
      where: { id },
      data: { deletedAt: null },
    });
    return { success: true, message: 'Nature restaurada con éxito' };
  }

  async findByUserId(userId: string) {
    const result = await this.prisma.zentraUserParty.findFirst({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        party: true,
      },
    });

    if (!result) {
      return {
        partyId: '',
        partyName: '',
      };
    }

    // Retornar datos del party
    return {
      partyId: result.party.id,
      partyName: result.party.name,
    };
  }

}