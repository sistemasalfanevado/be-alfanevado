import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraLandingPageRelationDto } from './dto/create-zentra-landing-page-relation.dto';
import { UpdateZentraLandingPageRelationDto } from './dto/update-zentra-landing-page-relation.dto';

import {
  LOT_STATUS, INSTALLMENT_STATUS, CURRENCY, VISIBIILITY, BUDGET_NATURE, BUDGET_CATEGORY
} from 'src/shared/constants/app.constants';

import * as moment from 'moment';

@Injectable()
export class ZentraLandingPageRelationService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraLandingPageRelationDto) {
    return this.prisma.zentraLandingPageRelation.create({
      data: createDto,
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraLandingPageRelation.findMany({
      where: { deletedAt: null },
      include: {
        zentraProject: {
          select: { name: true },
        },
        landingPage: {
          select: { title: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      zentraProjectId: item.zentraProjectId,
      zentraProjectName: item.zentraProject.name,
      landingPageId: item.landingPageId,
      landingPageTitle: item.landingPage.title,
    }));
  }


  async findOne(id: string) {
    return this.prisma.zentraLandingPageRelation.findUnique({
      where: { id },
      include: {
        zentraProject: true,
        landingPage: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraLandingPageRelationDto) {
    return this.prisma.zentraLandingPageRelation.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraLandingPageRelation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraLandingPageRelation.update({
      where: { id },
      data: { deletedAt: null },
    });
  }


  async getLotsByProjectId(zentraProjectId: string) {

    const relation = await this.prisma.zentraLandingPageRelation.findFirst({
      where: { zentraProjectId, deletedAt: null },
      include: {
        landingPage: {
          include: {
            lots: {
              include: {
                status: true,
              },
              where: { deletedAt: null },
            },
          },
        },
      },
    });

    if (!relation) {
      throw new Error('No se encontró una LandingPage para este proyecto');
    }

    const lots = relation.landingPage.lots;

    lots.sort((a, b) => {
      return a.status.title.localeCompare(b.status.title);
    });

    return lots.map((lot) => ({
      id: lot.id,
      title: `${lot.name} - ${lot.status.title}`,
      number: lot.number,
      block: lot.block,
      code: lot.code,
      status: lot.status.title,
      statusId: lot.status.id,
      area: lot.area,
      perimeter: lot.perimeter,
      pricePerSquareMeter: lot.pricePerSquareMeter ?? 0,
      totalPrice: lot.totalPrice ?? 0,
    }));
  }

  async getAvailableLots(zentraProjectId: string) {

    const relation = await this.prisma.zentraLandingPageRelation.findFirst({
      where: { zentraProjectId, deletedAt: null },
      include: {
        landingPage: {
          include: {
            lots: {
              include: {
                status: true,
              },
              where: { deletedAt: null, statusId: LOT_STATUS.DISPONIBLE },
            },
          },
        },
        zentraProject: true
      },
    });

    if (!relation) {
      throw new Error('No se encontró una LandingPage para este proyecto');
    }

    const projectName = relation.zentraProject.name;
    const lots = relation.landingPage.lots;

    lots.sort((a, b) => {
      return a.status.title.localeCompare(b.status.title);
    });

    return lots.map((lot) => ({
      number: lot.number,
      block: lot.block,
      code: lot.code,
      status: lot.status.title,
      area: lot.area,
      perimeter: lot.perimeter,
      project: projectName
    }));



  }

  async getLotsByProjectIds(projectIds: string[]) {

    const relations = await this.prisma.zentraLandingPageRelation.findMany({
      where: {
        zentraProjectId: { in: projectIds },
        deletedAt: null
      },
      include: {
        zentraProject: true,
        landingPage: {
          include: {
            lots: {
              where: { deletedAt: null, statusId: LOT_STATUS.DISPONIBLE },
              select: {
                totalPrice: true,
                statusId: true
              }
            }
          }
        }
      }
    });

    const allInstallments = await this.prisma.zentraInstallment.findMany({
      where: {
        deletedAt: null,
        installmentStatusId: { not: INSTALLMENT_STATUS.PAGADO },
        scheduledIncomeDocument: {
          document: {
            budgetItem: {
              definition: {
                projectId: { in: projectIds },
              },
            },
          },
        },
      },
      include: {
        scheduledIncomeDocument: {
          include: {
            document: {
              include: { budgetItem: { include: { definition: true } } }
            }
          }
        }
      }
    });

    // 3. Obtener Partidas Presupuestarias (Presupuesto vs Ejecutado)
    const budgetItems = await this.prisma.zentraBudgetItem.findMany({
      where: {
        deletedAt: null,
        visibilityId: VISIBIILITY.VISIBLE,
        definition: {
          projectId: { in: projectIds },
          natureId: { in: [BUDGET_NATURE.GASTO, BUDGET_NATURE.COSTO_DIRECTO] }
        }
      },
      include: {
        definition: true
      }
    });

    const exchangeRate = await this.getExchangeRateByDate(new Date());
    const buyRate = Number(exchangeRate?.buyRate || 1);


    // 4. Mapear resultados
    return relations.map(rel => {
      const project = rel.zentraProject;
      const allLots = rel.landingPage?.lots || [];

      const totalPriceSum = allLots
        .reduce((acc, lot) => acc + Number(lot.totalPrice || 0), 0);

      const projectDebtUSD = allInstallments
        .filter((i: any) => i.scheduledIncomeDocument.document.budgetItem.definition.projectId === project.id)
        .reduce((acc, i) => {
          const debt = Math.abs(Number(i.totalAmount) - Number(i.paidAmount));
          const amountUSD = (i.currencyId === CURRENCY.SOLES) ? (debt / buyRate) : debt;
          return acc + amountUSD;
        }, 0);

      const projectBudgets = budgetItems.filter(bi => bi.definition.projectId === project.id);
      
      let totalTerrenoUSD = 0;
      let totalObraUSD = 0;
      let totalGastosUSD = 0;

      projectBudgets.forEach(item => {
        const budgetAmount = Number(item.amount);
        const executedDolares = Math.abs(Number(item.executedDolares));
        
        const pendingUSD = budgetAmount - executedDolares

        if (item.definition.categoryId === BUDGET_CATEGORY.COSTO_TIERRA) {
          totalTerrenoUSD += pendingUSD;
        } else if (item.definition.natureId === BUDGET_NATURE.COSTO_DIRECTO) {
          totalObraUSD += pendingUSD;
        } else if (item.definition.natureId === BUDGET_NATURE.GASTO) {
          totalGastosUSD += pendingUSD;
        }
      });

      const totalPending = totalTerrenoUSD + totalObraUSD + totalGastosUSD;
      const totalIncome = Number(totalPriceSum.toFixed(2)) + Number(projectDebtUSD.toFixed(2));
      const totalAvailable = totalIncome - totalPending;
      
      return {
        projectId: project.id,
        projectName: project.name,
        projectImg: project.imageUrl,
        totalPrice: Number(totalPriceSum.toFixed(2)),
        totalDebt: Number(projectDebtUSD.toFixed(2)),
        totalIncome: Number(totalIncome.toFixed(2)),


        totalPending: Number(totalPending.toFixed(2)),
        totalTerreno: Number(totalTerrenoUSD.toFixed(2)),
        totalObra: Number(totalObraUSD.toFixed(2)),
        totalGastos: Number(totalGastosUSD.toFixed(2)),
        totalAvailable: Number(totalAvailable.toFixed(2))

      };
    });
  }


  async getExchangeRateByDate(date: Date) {
    const normalizedDate = moment(date).startOf('day').toDate();

    let exchangeRate = await this.prisma.zentraExchangeRate.findFirst({
      where: {
        date: {
          lte: normalizedDate,
        },
      },
      orderBy: { date: 'desc' },
    });

    return exchangeRate;
  }

}