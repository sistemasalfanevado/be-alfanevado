import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyDto } from './dto/create-zentra-party.dto';
import { UpdateZentraPartyDto } from './dto/update-zentra-party.dto';

@Injectable()
export class ZentraPartyService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraPartyDto: CreateZentraPartyDto) {
    const { partyRoleId, ...partyData } = createZentraPartyDto;

    return this.prisma.zentraParty.create({
      data: {
        ...partyData,
        partyRole: {
          connect: { id: partyRoleId }
        }
      },
      include: {
        partyRole: true
      }
    });
  }

  async findAll() {
    const results = await this.prisma.zentraParty.findMany({
      where: { deletedAt: null },
      include: {
        partyRole: true,
        _count: {
          select: { partyBankAccounts: true }
        }
      },
      orderBy: { name: 'asc' },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      document: item.document,
      email: item.email,
      phone: item.phone,
      address: item.address,

      partyRoleId: item.partyRole.id,
      completeName: `${item.name} - ${item.document}`,
      idFirebase: item.idFirebase,

      bankAccountsCount: item._count.partyBankAccounts,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraParty.findUnique({
      where: { id, deletedAt: null },
      include: { partyRole: true }
    });
  }

  async update(id: string, updateZentraPartyDto: UpdateZentraPartyDto) {
    const { partyRoleId, ...updateData } = updateZentraPartyDto;
    const data: any = { ...updateData };

    if (partyRoleId) {
      data.partyRole = { connect: { id: partyRoleId } };
    }

    return this.prisma.zentraParty.update({
      where: { id },
      data,
      include: { partyRole: true }
    });
  }

  async remove(id: string) {
    return this.prisma.zentraParty.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: string) {
    return this.prisma.zentraParty.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
}