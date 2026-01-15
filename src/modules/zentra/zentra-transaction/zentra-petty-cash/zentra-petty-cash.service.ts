import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPettyCashDto } from './dto/create-zentra-petty-cash.dto';
import { UpdateZentraPettyCashDto } from './dto/update-zentra-petty-cash.dto';

import { ZentraDocumentService } from '../zentra-document/zentra-document.service';
import { ZentraDocumentExpenseService } from '../zentra-document-expense/zentra-document-expense.service';
import { MailService } from '../../../../mail/mail.service';

import {
  DOCUMENT_CATEGORY,
  DOCUMENT_STATUS,
  DOCUMENT_ORIGIN,
  DOCUMENT_TYPE,
  PARTY_DOCUMENT_HIERARCHY,
  TRANSACTION_TYPE,
  PETTY_CASH_STATUS

} from 'src/shared/constants/app.constants';
import { Prisma } from '@prisma/client';

import * as moment from 'moment';

@Injectable()
export class ZentraPettyCashService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ZentraDocumentService))
    private readonly zentraDocumentService: ZentraDocumentService,
    @Inject(forwardRef(() => ZentraDocumentExpenseService))
    private zentraDocumentExpenseService: ZentraDocumentExpenseService,
    private mailService: MailService,
  ) { }

  /*
  async findAll() {
    const items = await this.prisma.zentraPettyCash.findMany({
      where: { deletedAt: null },
      orderBy: { registeredAt: 'desc' },
      include: this.includeRelations,
    });

    return items.map(item => this.mapEntityToDto(item));
  }

  async findOne(id: string) {
    return this.prisma.zentraPettyCash.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        approvedAmount: true,
        accountedAmount: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        budgetItem: {
          select: {
            definition: {
              select: {
                project: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }



  async update(id: string, dto: UpdateZentraPettyCashDto) {
    return this.prisma.zentraPettyCash.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPettyCash.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPettyCash.update({
      where: { id },
      data: { deletedAt: null },
    });
  }




  async removeDocument(documentId: string) {
    return this.prisma.zentraDocument.update({
      where: { id: documentId },
      data: { pettyCashId: null },
    });
  }

  // -----------------------------
  // AMOUNTS
  // -----------------------------
  async addIncrement(data: { pettyCashId: string; amount: number }) {
    return this.prisma.zentraPettyCash.update({
      where: { id: data.pettyCashId },
      data: {
        approvedAmount: {
          increment: data.amount,
        },
      },
    });
  }

  async addRefund(data: { pettyCashId: string; amount: number }) {
    return this.prisma.zentraPettyCash.update({
      where: { id: data.pettyCashId },
      data: {
        accountedAmount: {
          increment: data.amount,
        },
      },
    });
  }

  // -----------------------------
  // REPORT
  // -----------------------------
  async getAllDataReport(pettyCashId: string) {
    return this.prisma.zentraDocument.findMany({
      where: {
        deletedAt: null,
        pettyCashId,
      },
      select: {
        code: true,
        description: true,
        amountToPay: true,
        paidAmount: true,
        registeredAt: true,
        documentType: true,
        party: {
          select: {
            name: true,
            partyDocuments: {
              where: {
                deletedAt: null,
                documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL,
              },
              select: { document: true },
            },
          },
        },
        budgetItem: {
          select: {
            definition: {
              select: {
                name: true,
                category: { select: { name: true } },
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            area: { select: { name: true } },
          },
        },
        documentStatus: { select: { name: true } },
        files: { where: { deletedAt: null } },
      },
    });
  }

  */




  // Useful Methods



  private includeRelations = {
    party: true,
    currency: true,
    pettyCashStatus: true,
    budgetItem: {
      include: {
        definition: true,
      }
    },
    user: true,
    documents: {
      where: {
        documentTypeId: DOCUMENT_TYPE.ADELANTO,
        transactionTypeId: TRANSACTION_TYPE.EXIT,
        deletedAt: null,
      },
      include: {
        movements: {
          where: { deletedAt: null },
          orderBy: { paymentDate: 'asc' as Prisma.SortOrder },
          take: 1,
        }
      }
    },
  };


  private mapEntityToDto(item: any) {

    const firstDoc = item.documents && item.documents.length > 0 ? item.documents[0] : null;

    const firstMovement = firstDoc && firstDoc.movements && firstDoc.movements.length > 0
      ? firstDoc.movements[0]
      : null;

    const firstPaymentDate = firstMovement
      ? moment(firstMovement.paymentDate).format('DD/MM/YYYY')
      : 'Sin pago';

    const status = item.pettyCashStatus;

    let badgeConfig = { text: status?.name, class: 'badge-primary' };

    if (status?.id === PETTY_CASH_STATUS.FINALIZADO) {
      badgeConfig = { text: 'Finalizado', class: 'badge-success' };
    } else if (status?.id === PETTY_CASH_STATUS.ABONO_PENDIENTE) {
      badgeConfig = { text: 'Abono Pendiente', class: 'badge-info' };
    }

    return {
      id: item.id,
      code: item.code,
      description: item.description,

      requestedAmount: item.requestedAmount,
      approvedAmount: item.approvedAmount,
      accountedAmount: item.accountedAmount,

      balance: Number(item.approvedAmount) - Number(item.accountedAmount),


      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY'),

      partyId: item.party?.id,
      partyName: item.party?.name,

      currencyId: item.currency?.id,
      currencyName: item.currency?.name,

      documentTypeId: item.documentType?.id,
      documentTypeName: item.documentType?.name,

      pettyCashStatusId: item.pettyCashStatus?.id,

      transactionTypeId: item.transactionType?.id,
      transactionTypeName: item.transactionType?.name,

      budgetItemId: item.budgetItem.id,
      budgetItemName: `${item.budgetItem.definition.name}`,

      userId: item.user?.id,
      userName: item.user?.firstName,

      firstPaymentDate: firstPaymentDate,
      pettyCashStatusName: status?.name,
      statusBadge: badgeConfig,

    };

  }


  async findOne(id: string) {
    return this.prisma.zentraPettyCash.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        approvedAmount: true,
        accountedAmount: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          }
        },
        budgetItem: {
          select: {
            definition: {
              select: {
                project: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async addDocument(dataDocumentOrigin: any) {

    let dataDocument = await this.zentraDocumentService.createDocument(
      {
        code: dataDocumentOrigin.code,
        description: dataDocumentOrigin.description,

        totalAmount: dataDocumentOrigin.totalAmount,
        amountToPay: dataDocumentOrigin.amountToPay,

        taxAmount: dataDocumentOrigin.taxAmount,
        netAmount: dataDocumentOrigin.netAmount,
        detractionRate: dataDocumentOrigin.detractionRate,
        detractionAmount: dataDocumentOrigin.detractionAmount,

        paidAmount: dataDocumentOrigin.totalAmount,
        observation: dataDocumentOrigin.observation,
        idFirebase: '',
        hasMovements: false,

        registeredAt: new Date(dataDocumentOrigin.registeredAt),
        documentDate: new Date(dataDocumentOrigin.documentDate),
        expireDate: new Date(dataDocumentOrigin.expireDate),

        documentStatusId: DOCUMENT_STATUS.PENDIENTE,
        transactionTypeId: dataDocumentOrigin.transactionTypeId,
        documentTypeId: dataDocumentOrigin.documentTypeId,
        partyId: dataDocumentOrigin.partyId,
        budgetItemId: dataDocumentOrigin.budgetItemId,
        currencyId: dataDocumentOrigin.currencyId,
        userId: dataDocumentOrigin.userId,
        documentCategoryId: dataDocumentOrigin.documentCategoryId,
        accountabilityId: dataDocumentOrigin.accountabilityId,
        documentOriginId: DOCUMENT_ORIGIN.CAJA_CHICA
      },
    );

    await this.zentraDocumentExpenseService.addMovement({
      code: dataDocumentOrigin.code,
      description: dataDocumentOrigin.description,
      documentId: dataDocument.id,
      amount: dataDocumentOrigin.totalAmount,
      budgetItemId: dataDocumentOrigin.budgetItemId,
      paymentDate: new Date(dataDocumentOrigin.documentDate),

      transactionTypeId: dataDocumentOrigin.transactionTypeId,
      movementCategoryId: dataDocumentOrigin.movementCategoryId,
      bankAccountId: dataDocumentOrigin.bankAccountId,
      movementStatusId: dataDocumentOrigin.movementStatusId,

      idFirebase: '',
      documentUrl: '',
      documentName: '',
      fromTelecredito: false,
    })

    return { message: 'Success' }
  }

  async create(createDto: any) {

    const last = await this.prisma.zentraPettyCash.findFirst({
      where: {},
      orderBy: { createdAt: 'desc' },
      select: { code: true }
    });

    let nextNumber = 1;

    if (last?.code) {
      const parts = last.code.split('-');
      const number = parseInt(parts[1], 10);
      if (!isNaN(number)) nextNumber = number + 1;
    }

    const newCode = `CC-${String(nextNumber).padStart(4, '0')}`;

    const created = await this.prisma.zentraPettyCash.create({
      data: {
        description: createDto.description,
        requestedAmount: createDto.requestedAmount,
        approvedAmount: createDto.approvedAmount,
        accountedAmount: createDto.accountedAmount,
        registeredAt: createDto.registeredAt,
        partyId: createDto.partyId,
        currencyId: createDto.currencyId,
        pettyCashStatusId: createDto.pettyCashStatusId,
        budgetItemId: createDto.budgetItemId,
        userId: createDto.userId,
        code: newCode,
      },
      select: { id: true, code: true },
    });

    await this.zentraDocumentService.createDocument(
      {
        code: newCode,
        description: createDto.description,

        totalAmount: createDto.requestedAmount,
        amountToPay: createDto.requestedAmount,

        taxAmount: 0,
        netAmount: 0,
        detractionRate: 0,
        detractionAmount: 0,

        paidAmount: 0,
        observation: '',
        idFirebase: '',
        hasMovements: false,

        registeredAt: new Date(createDto.registeredAt),
        documentDate: new Date(createDto.registeredAt),
        expireDate: new Date(createDto.registeredAt),


        transactionTypeId: createDto.transactionTypeId,
        documentTypeId: createDto.documentTypeId,
        partyId: createDto.partyId,
        budgetItemId: createDto.budgetItemId,
        currencyId: createDto.currencyId,
        userId: createDto.userId,
        documentCategoryId: createDto.documentCategoryId,

        pettyCashId: created.id,

        documentStatusId: DOCUMENT_STATUS.PENDIENTE,
        documentOriginId: DOCUMENT_ORIGIN.CAJA_CHICA
      }
    );

    return { message: 'Documento creado exitosamente' };
  }

  async findByFilters(filters: {
    pettyCashStatusId?: string;
    partyId?: string;
    companyId?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
    deletedAt?: boolean;
  }) {
    const { deletedAt, pettyCashStatusId, partyId, companyId, userId, startDate, endDate } = filters;

    const where: any = {};

    if (deletedAt !== false) {
      where.deletedAt = null;
    }


    if (startDate || endDate) {
      where.registeredAt = {};
      if (startDate) {
        where.registeredAt.gte = moment(startDate).startOf('day').toDate();
      }
      if (endDate) {
        where.registeredAt.lte = moment(endDate).endOf('day').toDate();
      }
    }

    if (pettyCashStatusId && pettyCashStatusId.trim() !== '') {
      where.pettyCashStatus = { id: pettyCashStatusId };
    }

    if (partyId && partyId.trim() !== '') {
      where.party = { id: partyId };
    }

    if (userId && userId.trim() !== '') {
      where.user = { id: userId };
    }

    if (companyId && companyId.trim() !== '') {
      where.budgetItem = {
        definition: {
          project: {
            companyId: companyId
          },
        },
      };
    }

    const results = await this.prisma.zentraPettyCash.findMany({
      where,
      include: this.includeRelations,
      orderBy: {
        registeredAt: 'desc',
      },
    });


    return results.map(item => this.mapEntityToDto(item));;


  }

  async updateDocument(id: string, dataDocument: any) {

    await this.zentraDocumentService.updateSimple(id,
      {
        code: dataDocument.code,
        description: dataDocument.description,

        totalAmount: dataDocument.totalAmount,
        amountToPay: dataDocument.amountToPay,

        taxAmount: dataDocument.taxAmount,
        netAmount: dataDocument.netAmount,
        detractionRate: dataDocument.detractionRate,
        detractionAmount: dataDocument.detractionAmount,

        paidAmount: dataDocument.paidAmount,
        observation: dataDocument.observation,
        idFirebase: '',
        hasMovements: false,

        registeredAt: new Date(dataDocument.registeredAt),
        documentDate: new Date(dataDocument.documentDate),
        expireDate: new Date(dataDocument.expireDate),

        documentStatusId: dataDocument.documentStatusId,
        transactionTypeId: dataDocument.transactionTypeId,
        documentTypeId: dataDocument.documentTypeId,
        partyId: dataDocument.partyId,
        budgetItemId: dataDocument.budgetItemId,
        currencyId: dataDocument.currencyId,
        userId: dataDocument.userId,
        documentCategoryId: dataDocument.documentCategoryId,
        pettyCashId: dataDocument.pettyCashId,
        documentOriginId: DOCUMENT_ORIGIN.CAJA_CHICA
      },
    );

    await this.updataPettyCashData(dataDocument)

    return { message: 'Petty cash actualizada exitosamente' };


  }

  async updateSimpleDocument(id: string, dataDocument: any) {

    await this.zentraDocumentService.updateSimple(id,
      {
        documentCategoryId: dataDocument.documentCategoryId,
        pettyCashId: dataDocument.pettyCashId,
        documentOriginId: DOCUMENT_ORIGIN.CAJA_CHICA
      },
    );

    await this.updataPettyCashData(dataDocument)

    return { message: 'Petty cash actualizada exitosamente' };


  }

  async updateSimple(id: string, updateDto: any) {
    await this.prisma.zentraPettyCash.update({
      where: { id },
      data: {
        ...updateDto
      },
    });

    return {
      id: id
    }
  }


  async updataPettyCashData(documentData: any) {

    const pettyCashData = await this.findOne(documentData.pettyCashId);

    let documentList = await this.prisma.zentraDocument.findMany({
      where: {
        deletedAt: null,
        pettyCashId: documentData.pettyCashId,
      },
      select: {
        documentCategoryId: true,
        documentTypeId: true,
        paidAmount: true,
        amountToPay: true,
      }
    });

    let totalRequestedAmount = 0;
    let totalApprovedAmount = 0;
    let totalAccountedAmount = 0;


    for (let item of documentList) {
      if (item.documentCategoryId === DOCUMENT_CATEGORY.CLASICO && item.documentTypeId === DOCUMENT_TYPE.ADELANTO) {
        totalRequestedAmount += Number(item.amountToPay)
        totalApprovedAmount += Number(item.paidAmount)
      }
      if (item.documentCategoryId === DOCUMENT_CATEGORY.CLASICO && item.documentTypeId === DOCUMENT_TYPE.DEVOLUCION_USUARIO) {
        totalAccountedAmount += Number(item.paidAmount)
      }
      if (item.documentCategoryId === DOCUMENT_CATEGORY.CAJA_CHICA) {
        totalAccountedAmount += Number(item.paidAmount)
      }
    }

    let statePettyCash = PETTY_CASH_STATUS.RENDICION_PENDIENTE

    if (totalAccountedAmount === totalApprovedAmount && totalAccountedAmount > 0 && totalApprovedAmount > 0) {
      if (pettyCashData?.id) {
        //await this.mailService.notifyExpenseReportPendingAccounting(accountabilityData)
      }
      //statePettyCash = ACCOUNTABILITY_STATUS.VALIDACION_CONTABLE_PENDIENTE
    }

    return this.updateSimple(pettyCashData?.id + '', {
      accountedAmount: totalAccountedAmount,
      approvedAmount: totalApprovedAmount,
      requestedAmount: totalRequestedAmount,
      pettyCashStatusId: statePettyCash,
    });

  }


  async remove(id: string) {

    // Se elimina la rendicion de cuentas
    const pettyCash = await this.prisma.zentraPettyCash.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (!pettyCash) {
      throw new Error("Caja Chica no encontrado");
    }

    const documentList = await this.prisma.zentraDocument.findMany({
      where: { pettyCashId: id },
      select: { id: true }
    });

    for (const document of documentList) {
      try {
        await this.zentraDocumentService.remove(document.id);
      } catch (error) {
        console.error(`Error al eliminar documento ${document.id}:`, error);
      }
    }

    return { message: "Caja Chica, documento y movimientos eliminados correctamente" };


  }

  async removeDocument(id: string) {
    await this.zentraDocumentService.remove(id);
  }

  async addIncrement(dataDocument: any) {

    await this.zentraDocumentService.createDocument(
      {
        code: dataDocument.code,
        description: dataDocument.description,

        totalAmount: dataDocument.amountToPay,
        amountToPay: dataDocument.amountToPay,

        taxAmount: 0,
        netAmount: 0,
        detractionRate: 0,
        detractionAmount: 0,

        paidAmount: 0,
        observation: '',
        idFirebase: '',
        hasMovements: false,

        registeredAt: new Date(dataDocument.documentDate),
        documentDate: new Date(dataDocument.documentDate),
        expireDate: new Date(dataDocument.documentDate),

        documentStatusId: dataDocument.documentStatusId,
        transactionTypeId: dataDocument.transactionTypeId,
        documentTypeId: dataDocument.documentTypeId,
        partyId: dataDocument.partyId,
        budgetItemId: dataDocument.budgetItemId,
        currencyId: dataDocument.currencyId,
        userId: dataDocument.userId,
        pettyCashId: dataDocument.pettyCashId,

        documentCategoryId: dataDocument.documentCategoryId,
        documentOriginId: DOCUMENT_ORIGIN.CAJA_CHICA
      }
    );


    await this.updataPettyCashData(dataDocument)

    return { message: 'Caja Chica actualizada exitosamente' };

  }


}