import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectDto } from './dto/create-zentra-project.dto';
import { UpdateZentraProjectDto } from './dto/update-zentra-project.dto';

import { BUDGET_NATURE } from 'src/shared/constants/app.constants';


@Injectable()
export class ZentraProjectService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraProjectDto: CreateZentraProjectDto) {
    return this.prisma.zentraProject.create({
      data: {
        name: createZentraProjectDto.name,
        imageUrl: createZentraProjectDto.imageUrl,
        company: {
          connect: { id: createZentraProjectDto.companyId }
        }
      },
      include: {
        company: true
      }
    });
  }

  async findAll() {
    const results = await this.prisma.zentraProject.findMany({
      where: { deletedAt: null },
      include: { company: true },
      orderBy: {
        name: 'asc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,

      companyId: item.company.id,
      companyName: item.company.name,

      imageUrl: item.imageUrl,

    }));

  }

  async findOne(id: string) {
    return this.prisma.zentraProject.findUnique({
      where: { id, deletedAt: null },
      include: { company: true }
    });
  }

  async update(id: string, updateZentraProjectDto: UpdateZentraProjectDto) {
    const data: any = {
      name: updateZentraProjectDto.name,
      imageUrl: updateZentraProjectDto.imageUrl,
    };

    if (updateZentraProjectDto.companyId) {
      data.company = {
        connect: { id: updateZentraProjectDto.companyId }
      };
    }

    return this.prisma.zentraProject.update({
      where: { id },
      data,
      include: {
        company: true // Opcional
      }
    });
  }

  async remove(id: string) {
    return this.prisma.zentraProject.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraProject.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findAllWithCompany() {
    const results = await this.prisma.zentraProject.findMany({
      where: { deletedAt: null },
      include: {
        company: true,
        budgetItemDefinitions: {
          where: {
            natureId: BUDGET_NATURE.SISTEMAS,
          },
          include: {
            budgetItems: {
              take: 1,
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return results.map((project) => {
      // 🔹 Obtenemos la primera definición válida
      const definition = project.budgetItemDefinitions?.[0];
      const budgetItem = definition?.budgetItems?.[0];

      return {
        id: project.id,
        name: project.name,
        imageUrl: project.imageUrl,

        // 🔹 Datos planos de la compañía
        companyId: project.company?.id ?? null,
        companyName: project.company?.name ?? null,
        businessName: project.company?.businessName ?? null,
        address: project.company?.address ?? null,
        documentNumber: project.company?.documentNumber ?? null,
        legalRepresentative: project.company?.legalRepresentative ?? null,
        representativeDocumentNumber: project.company?.representativeDocumentNumber ?? null,

        // 🔹 Datos del primer budget item (si existe)
        budgetItemId: budgetItem?.id ?? null,
        budgetItemName: definition?.name ?? null,
      };
    });
  }




  async findAllWithDetails() {

    const results = await this.prisma.zentraProject.findMany({
      where: { deletedAt: null },
      include: {
        company: true,
        bankAccounts: {
          where: { deletedAt: null },
          include: {
            bank: true,
            currency: true,
          },
        },
        budgetItemDefinitions: {
          where: { deletedAt: null },
          include: {
            category: true,
            budgetItems: {
              where: { deletedAt: null },
              include: {
                currency: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return results.map((project) => ({
      id: project.id,
      name: project.name,
      imageUrl: project.imageUrl,
      company: {
        id: project.company.id,
        name: project.company.name,
      },
      bankAccounts: project.bankAccounts.map((acc) => ({
        id: acc.id,
        amount: acc.amount,
        bank: acc.bank.name,
        currency: acc.currency.name,
      })),
      budgetItemDefinitions: project.budgetItemDefinitions.map((def) => ({
        id: def.id,
        name: def.name,
        category: def.category.name,
        budgetItems: def.budgetItems.map((item) => ({
          id: item.id,
          amount: item.amount,
          executedAmount: item.executedAmount,
          executedSoles: item.executedSoles,
          executedDolares: item.executedDolares,
          currency: item.currency.name,
        })),
      })),
    }));
  }

}