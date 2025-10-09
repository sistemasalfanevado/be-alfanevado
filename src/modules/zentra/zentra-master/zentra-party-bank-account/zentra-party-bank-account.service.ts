import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyBankAccountDto } from './dto/create-zentra-party-bank-account.dto';
import { UpdateZentraPartyBankAccountDto } from './dto/update-zentra-party-bank-account.dto';

@Injectable()
export class ZentraPartyBankAccountService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraPartyBankAccountDto: CreateZentraPartyBankAccountDto) {
    await this.prisma.zentraPartyBankAccount.create({
      data: createZentraPartyBankAccountDto,
    });

    return { message: "Cuenta bancaria creada correctamente" };
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraPartyBankAccount.findMany({
      where: { deletedAt: null },
      orderBy: [
        { bank: { name: 'asc' } },
        { party: { name: 'asc' } },
        { currency: { name: 'asc' } },
      ],
      include: {
        bank: true,
        currency: true,
        party: true,
        type: true,       // 🔹 nuevo
        hierarchy: true,  // 🔹 nuevo
      },
    });

    return results.map((item) => ({
      id: item.id,
      account: item.account,
      cci: item.cci,

      bankId: item.bank?.id || '',
      bankName: item.bank?.name || '',

      partyId: item.party?.id || '',
      partyName: item.party?.name || '',

      currencyId: item.currency?.id || '',
      currencyName: item.currency?.name || '',

      typeId: item.type?.id || '',
      typeName: item.type?.name || '',

      hierarchyId: item.hierarchy?.id || '',
      hierarchyName: item.hierarchy?.name || '',

      completeName: `${item.bank?.name || ''} - ${item.party?.name || ''} - ${item.currency?.name || ''}`,
    }));
  }

  async findByPartyId(partyId: string): Promise<any[]> {
    const results = await this.prisma.zentraPartyBankAccount.findMany({
      where: { partyId, deletedAt: null },
      include: {
        bank: true,
        currency: true,
        party: true,
        type: true,
        hierarchy: true,
      },
    });

    return results.map((item) => ({
      id: item.id,
      account: item.account,
      cci: item.cci,

      bankId: item.bank?.id || null,
      bankName: item.bank?.name || null,

      partyId: item.party?.id || null,
      partyName: item.party?.name || null,

      currencyId: item.currency?.id || null,
      currencyName: item.currency?.name || null,

      typeId: item.type?.id || null,
      typeName: item.type?.name || null,

      hierarchyId: item.hierarchy?.id || null,
      hierarchyName: item.hierarchy?.name || null,
    }));
  }


  async findOne(id: string) {
    return this.prisma.zentraPartyBankAccount.findFirst({
      where: { id, deletedAt: null },
      include: {
        bank: true,
        currency: true,
        party: true,
      },
    });
  }

  async update(id: string, updateZentraPartyBankAccountDto: UpdateZentraPartyBankAccountDto) {
    return this.prisma.zentraPartyBankAccount.update({
      where: { id },
      data: updateZentraPartyBankAccountDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPartyBankAccount.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPartyBankAccount.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}