import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyBankAccountDto } from './dto/create-zentra-party-bank-account.dto';
import { UpdateZentraPartyBankAccountDto } from './dto/update-zentra-party-bank-account.dto';

@Injectable()
export class ZentraPartyBankAccountService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraPartyBankAccountDto: CreateZentraPartyBankAccountDto) {
    return this.prisma.zentraPartyBankAccount.create({
      data: createZentraPartyBankAccountDto,
    });
  }


  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraPartyBankAccount.findMany({
      where: { deletedAt: null },
      orderBy: [
        { bank: { name: 'asc' } },
        { party: { name: 'asc' } },
        { currency: { name: 'asc' } }
      ],
      include: {
        bank: true,
        currency: true,
        party: true,
      },
    });

    return results.map((item) => ({
      id: item.id,
      account: item.account,
      cci: item.cci,
      description: item.description,

      bankId: item.bank ? item.bank.id : '',
      bankName: item.bank ? item.bank.name : '',

      partyId: item.party.id,
      partyName: item.party.name,

      currencyId: item.currency ? item.currency.id : '',
      currencyName: item.currency ? item.currency.name : '',

      completeName: `${item.bank ? item.bank.name : ''} - ${item.party.name} - ${item.currency ? item.currency.name : ''}`

    }));
  }

  async findByPartyId(partyId: string): Promise<any[]> {
    const results = await this.prisma.zentraPartyBankAccount.findMany({
      where: {
        partyId,
        deletedAt: null,
      },
      include: {
        bank: true,
        currency: true,
        party: true,
      },
    });

    return results.map((item) => ({
      id: item.id,
      account: item.account,
      cci: item.cci,
      description: item.description,

      bankId: item.bank ? item.bank.id : null,
      bankName: item.bank ? item.bank.name : null,

      partyId: item.party.id,
      partyName: item.party.name,

      currencyId: item.currency ? item.currency.id : null,
      currencyName: item.currency ? item.currency.name : null,
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