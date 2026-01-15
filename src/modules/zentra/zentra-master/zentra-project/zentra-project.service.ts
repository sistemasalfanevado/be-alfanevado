import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectDto } from './dto/create-zentra-project.dto';
import { UpdateZentraProjectDto } from './dto/update-zentra-project.dto';

import { BUDGET_NATURE, MOVEMENT_CATEGORY, BANK, CURRENCY } from 'src/shared/constants/app.constants';
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
        company: {
          include: {
            projects: {
              include: {
                bankAccounts: {
                  where: {
                    bankId: BANK.BCP,
                    currencyId: CURRENCY.SOLES
                  },
                  include: {
                    bank: true,
                    currency: true
                  }
                }
              }
            }
          }
        },
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
                    },
                    bankAccount: {
                      deletedAt: null
                    }
                  },
                  select: {
                    id: true,
                    paymentDate: true,
                    executedAmount: true,
                    executedDolares: true,
                    executedSoles: true,
                    code: true,
                    amount: true,
                    document: {
                      select: {
                        id: true,
                        description: true,
                        party: {
                          select: {
                            id: true,
                            name: true
                          }
                        }
                      }
                    },
                    bankAccount: {
                      select: {
                        id: true,
                        currency: {
                          select: {
                            name: true
                          }
                        },
                        bank: {
                          select: {
                            id: true,
                            name: true
                          }
                        }
                      }
                    },
                    transactionType: {
                      select: {
                        id: true,
                        name: true
                      }
                    }


                  }
                }
              }
            }
          }
        },

      },
      orderBy: { name: 'asc' },
    });

    return results.map((project) => {

      const budgetItem = project.incomes;

      let budgetItemDefault: any = '';
      let budgetItemIncome: any = '';
      let budgetItemAccountability: any = '';
      let budgetItemFinancialExpense: any = '';
      let budgetItemPettyCash: any = '';

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
        if (itemBudget.budgetItem.definition.nature.id === BUDGET_NATURE.GASTO) {
          budgetItemFinancialExpense = itemBudget.budgetItem;
        }
        if (itemBudget.budgetItem.definition.nature.id === BUDGET_NATURE.CAJA_CHICA) {
          budgetItemPettyCash = itemBudget.budgetItem;
        }
      }

      let profitabilityDaily = 0;
      let profitabilityWeekly = 0;

      const today = moment().startOf("day");

      const profitabilityDailyMovements: any = [];
      const profitabilityWeeklyMovements: any = [];

      for (const def of project.budgetItemDefinitions) {
        for (const item of def.budgetItems) {
          for (const mv of item.movements) {

            // 1. tipo de cambio calculado si no hay relación exchangeRate
            const executedAmount = Number(mv.executedAmount);
            const executedSoles = Number(mv.executedSoles);
            const executedDolares = Number(mv.executedDolares);

            let exchangeRate = 1;

            if (executedDolares !== 0) {
              if (executedAmount === executedDolares) {
                exchangeRate = executedSoles / executedDolares;
              } else {
                exchangeRate = executedAmount / executedDolares;
              }
            }

            exchangeRate = Number(exchangeRate.toFixed(2));

            const movementResult = {
              id: mv.id,
              paymentDate: moment(mv.paymentDate).format('DD/MM/YYYY'),
              code: mv.code,
              description: mv.document?.description ?? "",
              partyName: mv.document?.party?.name ?? null,

              bankAccountComplete: mv.bankAccount
                ? `${mv.bankAccount.bank?.name ?? ''} - ${mv.bankAccount.currency?.name ?? ''}`
                : null,

              transactionTypeName: mv.transactionType?.name ?? null,
              transactionTypeId: mv.transactionType?.id ?? null,

              amount: mv.amount,
              // Valores originales
              executedAmount,
              executedSoles,
              montoDolares: executedDolares,

              // Tipo de cambio calculado
              tipoCambio: exchangeRate
            };


            const payment = moment(mv.paymentDate);
            profitabilityWeekly += executedDolares;
            profitabilityWeeklyMovements.push(movementResult);


            if (payment.isSame(today, "day")) {
              profitabilityDaily += executedDolares;
              profitabilityDailyMovements.push(movementResult);
            }


          }
        }
      }

      profitabilityWeeklyMovements.sort((a, b) =>
        moment(b.paymentDate, "DD/MM/YYYY").toDate().getTime() -
        moment(a.paymentDate, "DD/MM/YYYY").toDate().getTime()
      );

      profitabilityDailyMovements.sort((a, b) =>
        moment(b.paymentDate, "DD/MM/YYYY").toDate().getTime() -
        moment(a.paymentDate, "DD/MM/YYYY").toDate().getTime()
      );

      const projectWithBankAccount = project.company?.projects?.find(
        (p) => p.bankAccounts && p.bankAccounts.length > 0
      );
      const bankAccount = projectWithBankAccount?.bankAccounts?.[0] ?? null;



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

        financialExpenseBudgetItemId: budgetItemFinancialExpense?.id ?? '',
        financialExpenseBudgetItemName: budgetItemFinancialExpense?.definition?.name ?? '',

        pettyCashBudgetItemId: budgetItemPettyCash?.id ?? '',
        pettyCashBudgetItemName: budgetItemPettyCash?.definition?.name ?? '',

        

        // Rentabilidad diaria y semanal 
        profitabilityDaily,
        profitabilityWeekly,

        profitabilityDailyMovements,
        profitabilityWeeklyMovements,

        profitabilityDailyDate: moment(today).format('DD/MM/YYYY'),
        profitabilityWeeklyStart: moment(weekStart).format('DD/MM/YYYY'),
        profitabilityWeeklyEnd: moment(weekEnd).format('DD/MM/YYYY'),

        // Bank Id
        bankAccountId: bankAccount?.id ?? null,
        bankAccountName: bankAccount
          ? `${bankAccount.bank?.name ?? ''} - ${bankAccount.currency?.name ?? ''}`
          : null,

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