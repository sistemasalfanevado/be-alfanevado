import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBankAccountDto } from './dto/create-zentra-bank-account.dto';
import { UpdateZentraBankAccountDto } from './dto/update-zentra-bank-account.dto';

@Injectable()
export class ZentraBankAccountService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBankAccountDto) {
    const { bankId, projectId, currencyId, ...data } = createDto;

    return this.prisma.zentraBankAccount.create({
      data: {
        ...data,
        bank: { connect: { id: bankId } },
        project: { connect: { id: projectId } },
        currency: { connect: { id: currencyId } }
      },
      include: {
        bank: true,
        project: true,
        currency: true
      }
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraBankAccount.findMany({
      where: { deletedAt: null },
      include: {
        bank: true,
        project: true,
        currency: true
      }
    });

    return results.map((item) => ({
      id: item.id,
      
      amount: item.amount,

      bankId: item.bank.id,
      bankName: item.bank.name,

      projectId: item.project.id,
      projectName: item.project.name,

      currencyId: item.currency.id,
      currencyName: item.currency.name,

      completeName: item.project.name + ' - ' + item.bank.name + ' - ' + item.currency.name
 
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraBankAccount.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraBankAccountDto) {
    const { bankId, projectId, currencyId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (bankId) updateData.bank = { connect: { id: bankId } };
    if (projectId) updateData.project = { connect: { id: projectId } };
    if (currencyId) updateData.currency = { connect: { id: currencyId } };

    return this.prisma.zentraBankAccount.update({
      where: { id },
      data: updateData,
      include: {
        bank: true,
        project: true,
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