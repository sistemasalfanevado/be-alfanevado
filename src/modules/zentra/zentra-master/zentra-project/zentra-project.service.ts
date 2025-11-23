import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectDto } from './dto/create-zentra-project.dto';
import { UpdateZentraProjectDto } from './dto/update-zentra-project.dto';

import { BUDGET_NATURE, MOVEMENT_CATEGORY } from 'src/shared/constants/app.constants';
import * as moment from 'moment';

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
        incomes: { // 👈 se agregan los ingresos del proyecto
          where: { deletedAt: null },
          include: {
            budgetItem: {
              include: {
                definition: true,
              },
            },
          },
          take: 1, // si solo quieres el primero; si quieres todos, elimina esta línea
        },
      },
      orderBy: { name: 'asc' },
    });

    return results.map((project) => {
      const definition = project.budgetItemDefinitions?.[0];
      const budgetItem = definition?.budgetItems?.[0];

      // 🔹 Tomamos el primer ingreso (si existe)
      const income = project.incomes?.[0];

      return {
        id: project.id,
        name: project.name,
        imageUrl: project.imageUrl,

        // 🔹 Datos de compañía
        companyId: project.company?.id ?? null,
        companyName: project.company?.name ?? null,
        businessName: project.company?.businessName ?? null,
        address: project.company?.address ?? null,
        documentNumber: project.company?.documentNumber ?? null,
        legalRepresentative: project.company?.legalRepresentative ?? null,
        representativeDocumentNumber: project.company?.representativeDocumentNumber ?? null,

        // 🔹 Presupuesto (definición)
        budgetItemId: budgetItem?.id ?? null,
        budgetItemName: definition?.name ?? null,

        // 🔹 Ingreso (si existe)
        incomeBudgetItemId: income?.budgetItem?.id ?? '',
        incomeBudgetItemName: income?.budgetItem?.definition?.name ?? '',
      };
    });
  }


  async findAllWithCompanyUser(userId: string) {

    const weekStart = moment().startOf('week').add(1, 'day').toDate();  // Lunes
    const weekEnd = moment().endOf('week').add(1, 'day').toDate();    // Domingo
    
    const results = await this.prisma.zentraProject.findMany({
      where: {
        deletedAt: null,
        projectUsers: {
          some: {
            userId: userId,
            deletedAt: null,
          }
        }
      },
      include: {
        company: true,
        incomes: {
          where: { deletedAt: null },
          include: {
            budgetItem: {
              include: {
                definition: {
                  include: {
                    nature: true
                  }
                },
              },
            },
          },
        },
        budgetItemDefinitions: {
          include: {
            budgetItems: {
              include: {
                movements: {
                  where: {
                    deletedAt: null,
                    movementCategoryId: MOVEMENT_CATEGORY.RENTABILIDAD,
                    paymentDate: {
                      gte: weekStart,
                      lte: weekEnd
                    }
                  },
                  select: {
                    id: true,
                    paymentDate: true,
                    executedDolares: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' },
    });

    return results.map((project) => {

      const budgetItem = project.incomes;
      
      let budgetItemDefault: any = '';
      let budgetItemIncome: any = '';
      let budgetItemAccountability: any = '';

      for (let itemBudget of budgetItem) {
        if (itemBudget.budgetItem.definition.nature.id === BUDGET_NATURE.SISTEMAS) {
          budgetItemDefault = itemBudget.budgetItem;
        }
        if (itemBudget.budgetItem.definition.nature.id === BUDGET_NATURE.INGRESO) {
          budgetItemIncome = itemBudget.budgetItem;
        }
        if (itemBudget.budgetItem.definition.nature.id === BUDGET_NATURE.RENDICION_CUENTA) {
          budgetItemAccountability = itemBudget.budgetItem;
        }
      }

      let profitabilityDaily = 0;
      let profitabilityWeekly = 0;

      const today = moment().startOf("day");

      for (const def of project.budgetItemDefinitions) {
        for (const item of def.budgetItems) {
          for (const mv of item.movements) {
            const payment = moment(mv.paymentDate);
            profitabilityWeekly += Number(mv.executedDolares) ?? 0;
            if (payment.isSame(today, "day")) {
              profitabilityDaily += Number(mv.executedDolares) ?? 0;
            }
          }
        }
      }

      return {
        id: project.id,
        name: project.name,
        imageUrl: project.imageUrl,

        companyId: project.company?.id ?? null,
        companyName: project.company?.name ?? null,
        businessName: project.company?.businessName ?? null,
        address: project.company?.address ?? null,
        documentNumber: project.company?.documentNumber ?? null,
        legalRepresentative: project.company?.legalRepresentative ?? null,
        representativeDocumentNumber: project.company?.representativeDocumentNumber ?? null,

        budgetItemId: budgetItemDefault?.id ?? '',
        budgetItemName: budgetItemDefault?.definition?.name ?? '',

        incomeBudgetItemId: budgetItemIncome?.id ?? '',
        incomeBudgetItemName: budgetItemIncome?.definition?.name ?? '',

        accountabilityBudgetItemId: budgetItemAccountability?.id ?? '',
        accountabilityBudgetItemName: budgetItemAccountability?.definition?.name ?? '',

        // Rentabilidad diaria y semanal 
        profitabilityDaily,
        profitabilityWeekly
      
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



  async findAllByCompany(companyId: string) {
    const results = await this.prisma.zentraProject.findMany({
      where: { deletedAt: null, companyId },
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


}