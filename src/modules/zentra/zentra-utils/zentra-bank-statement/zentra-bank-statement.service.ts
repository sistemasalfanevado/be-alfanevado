import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBankStatementDto } from './dto/create-zentra-bank-statement.dto';
import { UpdateZentraBankStatementDto } from './dto/update-zentra-bank-statement.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraBankStatementService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBankStatementDto) {
    const { projectId, bankAccountId, ...data } = createDto;

    return this.prisma.zentraBankStatement.create({
      data: {
        ...data,
        project: { connect: { id: projectId } },
        bankAccount: { connect: { id: bankAccountId } },
      },
      include: {
        project: true,
        bankAccount: true,
      },
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraBankStatement.findMany({
      where: { deletedAt: null },
      include: {
        project: true,
        bankAccount: {
          include: {
            bank: true,
            currency: true,
          }
        }
      },
      orderBy: [
        { statementDate: 'desc' },
      ],
    });

    return results.map((item) => ({
      id: item.id,
      projectId: item.project.id,
      projectName: item.project.name,

      bankAccountId: item.bankAccount.id,

      bankAccountName: `${item.bankAccount.bank.name} - ${item.bankAccount.currency.name}`,

      balance: item.balance,
      description: item.description,
      statementDate: moment(item.statementDate).format('DD/MM/YYYY'),
      documentUrl: item.documentUrl,
      documentName: item.documentName,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraBankStatement.findUnique({
      where: { id, deletedAt: null },
      include: {
        project: true,
        bankAccount: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraBankStatementDto) {
    const { projectId, bankAccountId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (projectId) updateData.project = { connect: { id: projectId } };
    if (bankAccountId) updateData.bankAccount = { connect: { id: bankAccountId } };

    return this.prisma.zentraBankStatement.update({
      where: { id },
      data: updateData,
      include: {
        project: true,
        bankAccount: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBankStatement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBankStatement.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findAllByProject(projectId: string): Promise<any[]> {
    const results = await this.prisma.zentraBankStatement.findMany({
      where: {
        deletedAt: null,
        projectId,
      },
      include: {
        project: true,
        bankAccount: {
          include: {
            bank: true,
            currency: true,
          }
        }
      },
      orderBy: [
        { statementDate: 'desc' },
      ],
    });

    return results.map((item) => ({
      id: item.id,
      projectId: item.project.id,
      projectName: item.project.name,
      bankAccountId: item.bankAccount.id,

      bankAccountName: `${item.bankAccount.bank.name} - ${item.bankAccount.currency.name}`,

      balance: item.balance,
      description: item.description,
      statementDate: moment(item.statementDate).format('DD/MM/YYYY'),
      documentUrl: item.documentUrl,
      documentName: item.documentName,
    }));
  }

}