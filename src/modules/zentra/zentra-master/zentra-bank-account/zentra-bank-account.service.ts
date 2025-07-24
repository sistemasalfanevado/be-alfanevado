import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBankAccountDto } from './dto/create-zentra-bank-account.dto';
import { UpdateZentraBankAccountDto } from './dto/update-zentra-bank-account.dto';

@Injectable()
export class ZentraBankAccountService {
  constructor(private prisma: PrismaService) {}

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

  async findAll() {
    return this.prisma.zentraBankAccount.findMany({
      where: { deletedAt: null },
      include: {
        bank: true,
        company: true,
        currency: true
      }
    });
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