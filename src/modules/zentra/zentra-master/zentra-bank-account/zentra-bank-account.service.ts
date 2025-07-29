import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBankAccountDto } from './dto/create-zentra-bank-account.dto';
import { UpdateZentraBankAccountDto } from './dto/update-zentra-bank-account.dto';

@Injectable()
export class ZentraBankAccountService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBankAccountDto) {
    const { bankId, companyId, currencyId, ...data } = createDto;

    return this.prisma.zentraBankAccount.create({
      data: {
        ...data,
        bank: { connect: { id: bankId } },
        company: { connect: { id: companyId } },
        currency: { connect: { id: currencyId } }
      },
      include: {
        bank: true,
        company: true,
        currency: true
      }
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraBankAccount.findMany({
      where: { deletedAt: null },
      include: {
        bank: true,
        company: true,
        currency: true
      }
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      amount: item.amount,

      bankId: item.bank.id,
      bankName: item.bank.name,

      companyId: item.company.id,
      companyName: item.company.name,

      currencyId: item.currency.id,
      currencyName: item.currency.name,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraBankAccount.findUnique({
      where: { id, deletedAt: null },
      include: {
        bank: true,
        company: true,
        currency: true,
        documents: true,
        movements: true
      }
    });
  }

  async update(id: string, updateDto: UpdateZentraBankAccountDto) {
    const { bankId, companyId, currencyId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (bankId) updateData.bank = { connect: { id: bankId } };
    if (companyId) updateData.company = { connect: { id: companyId } };
    if (currencyId) updateData.currency = { connect: { id: currencyId } };

    return this.prisma.zentraBankAccount.update({
      where: { id },
      data: updateData,
      include: {
        bank: true,
        company: true,
        currency: true
      }
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBankAccount.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBankAccount.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
}