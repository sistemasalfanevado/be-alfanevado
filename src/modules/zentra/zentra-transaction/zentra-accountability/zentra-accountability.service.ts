import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraAccountabilityDto } from './dto/create-zentra-accountability.dto';
import { UpdateZentraAccountabilityDto } from './dto/update-zentra-accountability.dto';
import { ZentraDocumentService } from '../zentra-document/zentra-document.service';
import { ZentraDocumentSalesService } from '../zentra-document-sales/zentra-document-sales.service';
import { MailService } from '../../../../mail/mail.service';


import { DOCUMENT_CATEGORY, DOCUMENT_STATUS, DOCUMENT_ORIGIN, ACCOUNTABILITY_STATUS, DOCUMENT_TYPE, PARTY_DOCUMENT_HIERARCHY } from 'src/shared/constants/app.constants';

import * as moment from 'moment';

@Injectable()
export class ZentraAccountabilityService {

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ZentraDocumentService))
    private readonly zentraDocumentService: ZentraDocumentService,
    @Inject(forwardRef(() => ZentraDocumentSalesService))
    private readonly zentraDocumentSalesService: ZentraDocumentSalesService,
    private mailService: MailService
  ) { }

  private includeRelations = {
    party: true,
    currency: true,
    documentType: true,
    accountabilityStatus: true,
    transactionType: true,
    budgetItem: {
      include: {
        definition: true,
      }
    },
    user: true,
  };

  private mapEntityToDto(item: any) {
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

      accountabilityStatusId: item.accountabilityStatus?.id,
      accountabilityStatusName: item.accountabilityStatus?.name,

      transactionTypeId: item.transactionType?.id,
      transactionTypeName: item.transactionType?.name,

      budgetItemId: item.budgetItem.id,
      budgetItemName: `${item.budgetItem.definition.name}`,

      userId: item.user?.id,
      userName: item.user?.firstName,

    };
  }

  async create(createDto: any) {

    const last = await this.prisma.zentraAccountability.findFirst({
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

    const newCode = `RC-${String(nextNumber).padStart(4, '0')}`;

    const created = await this.prisma.zentraAccountability.create({
      data: {
        description: createDto.description,
        requestedAmount: createDto.requestedAmount,
        approvedAmount: createDto.approvedAmount,
        accountedAmount: createDto.accountedAmount,
        registeredAt: createDto.registeredAt,
        partyId: createDto.partyId,
        currencyId: createDto.currencyId,
        documentTypeId: createDto.documentTypeId,
        accountabilityStatusId: createDto.accountabilityStatusId,
        transactionTypeId: createDto.transactionTypeId,
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

        accountabilityId: created.id,

        documentStatusId: DOCUMENT_STATUS.PENDIENTE,
        documentOriginId: DOCUMENT_ORIGIN.RENDICION_CUENTAS
      }
    );

    return { message: 'Documento creado exitosamente' };
  }


  async findAll() {
    const items = await this.prisma.zentraAccountability.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        registeredAt: 'desc',
      },
      include: this.includeRelations,
    });

    return items.map(item => this.mapEntityToDto(item));
  }

  async findOne(id: string) {
    return this.prisma.zentraAccountability.findUnique({
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



  async update(id: string, updateDto: UpdateZentraAccountabilityDto) {
    return this.prisma.zentraAccountability.update({
      where: { id },
      data: updateDto,
    });
  }

  async updateSimple(id: string, updateDto: any) {
    await this.prisma.zentraAccountability.update({
      where: { id },
      data: {
        ...updateDto
      },
    });

    return {
      id: id
    }
  }

  async remove(id: string) {

    // Se elimina la rendicion de cuentas
    const accountability = await this.prisma.zentraAccountability.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (!accountability) {
      throw new Error("Rendicion de cuentas no encontrado");
    }

    const documentList = await this.prisma.zentraDocument.findMany({
      where: { accountabilityId: id },
      select: { id: true }
    });

    for (const document of documentList) {
      try {
        await this.zentraDocumentService.remove(document.id);
      } catch (error) {
        console.error(`Error al eliminar documento ${document.id}:`, error);
      }
    }

    return { message: "Rendición de cuenta, documento y movimientos eliminados correctamente" };


  }

  async restore(id: string) {
    return this.prisma.zentraAccountability.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findByFilters(filters: {
    accountabilityStatusId?: string;
    partyId?: string;
    projectId?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
    deletedAt?: boolean;
  }) {
    const { deletedAt, accountabilityStatusId, partyId, projectId, userId, startDate, endDate } = filters;

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

    if (accountabilityStatusId && accountabilityStatusId.trim() !== '') {
      where.accountabilityStatus = { id: accountabilityStatusId };
    }

    if (partyId && partyId.trim() !== '') {
      where.party = { id: partyId };
    }

    if (userId && userId.trim() !== '') {
      where.user = { id: userId };
    }

    if (projectId && projectId.trim() !== '') {
      where.budgetItem = {
        definition: {
          projectId: projectId,
        },
      };
    }

    const results = await this.prisma.zentraAccountability.findMany({
      where,
      include: this.includeRelations,
      orderBy: {
        registeredAt: 'desc',
      },
    });

    return results.map(item => this.mapEntityToDto(item));;


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
        accountabilityId: dataDocument.accountabilityId,

        documentCategoryId: dataDocument.documentCategoryId,
        documentOriginId: DOCUMENT_ORIGIN.RENDICION_CUENTAS
      }
    );


    await this.updataAccountabilityData(dataDocument)

    return { message: 'Accountability actualizada exitosamente' };

  }

  async addRefund(dataDocument: any) {

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
        accountabilityId: dataDocument.accountabilityId,

        documentCategoryId: dataDocument.documentCategoryId,
        documentOriginId: DOCUMENT_ORIGIN.RENDICION_CUENTAS
      }
    );

    //await this.updataAccountabilityData(dataDocument)

    return { message: 'Accountability actualizada exitosamente' };

  }

  async addDocument(dataAccountability: any) {

    return await this.zentraDocumentService.createDocument(
      {
        code: dataAccountability.code,
        description: dataAccountability.description,

        totalAmount: dataAccountability.totalAmount,
        amountToPay: dataAccountability.amountToPay,

        taxAmount: dataAccountability.taxAmount,
        netAmount: dataAccountability.netAmount,
        detractionRate: dataAccountability.detractionRate,
        detractionAmount: dataAccountability.detractionAmount,

        paidAmount: 0,
        observation: dataAccountability.observation,
        idFirebase: '',
        hasMovements: false,

        registeredAt: new Date(dataAccountability.registeredAt),
        documentDate: new Date(dataAccountability.documentDate),
        expireDate: new Date(dataAccountability.expireDate),

        documentStatusId: DOCUMENT_STATUS.PENDIENTE,
        transactionTypeId: dataAccountability.transactionTypeId,
        documentTypeId: dataAccountability.documentTypeId,
        partyId: dataAccountability.partyId,
        budgetItemId: dataAccountability.budgetItemId,
        currencyId: dataAccountability.currencyId,
        userId: dataAccountability.userId,
        documentCategoryId: dataAccountability.documentCategoryId,
        accountabilityId: dataAccountability.accountabilityId,
        documentOriginId: DOCUMENT_ORIGIN.RENDICION_CUENTAS
      },

    );
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
        accountabilityId: dataDocument.accountabilityId,
        documentOriginId: DOCUMENT_ORIGIN.RENDICION_CUENTAS
      },
    );

    await this.updataAccountabilityData(dataDocument)

    return { message: 'Accountability actualizada exitosamente' };


  }

  async updateSimpleDocument(id: string, dataDocument: any) {

    await this.zentraDocumentService.updateSimple(id,
      {
        documentCategoryId: dataDocument.documentCategoryId,
        accountabilityId: dataDocument.accountabilityId,
        documentOriginId: DOCUMENT_ORIGIN.RENDICION_CUENTAS
      },
    );

    await this.updataAccountabilityData(dataDocument)

    return { message: 'Accountability actualizada exitosamente' };


  }

  async removeDocument(id: string) {
    await this.zentraDocumentService.remove(id);
  }

  // Devolucion
  async addDocumentReturn(dataDocument: any) {

    let document = await this.zentraDocumentService.createDocument(
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
        observation: dataDocument.codeMovement,
        idFirebase: '',
        hasMovements: false,

        registeredAt: new Date(dataDocument.registeredAt),
        documentDate: new Date(dataDocument.registeredAt),
        expireDate: new Date(dataDocument.registeredAt),

        documentStatusId: dataDocument.documentStatusId,
        transactionTypeId: dataDocument.transactionTypeId,
        documentTypeId: dataDocument.documentTypeId,
        partyId: dataDocument.partyId,
        budgetItemId: dataDocument.budgetItemId,
        currencyId: dataDocument.currencyId,
        userId: dataDocument.userId,
        accountabilityId: dataDocument.accountabilityId,
        documentCategoryId: DOCUMENT_CATEGORY.CLASICO,
        documentOriginId: DOCUMENT_ORIGIN.RENDICION_CUENTAS
      }
    );

    await this.zentraDocumentSalesService.addMovement({
      code: dataDocument.codeMovement,
      description: dataDocument.description,
      documentId: document.id,
      amount: dataDocument.amountToPay,
      transactionTypeId: dataDocument.transactionTypeId,
      movementCategoryId: dataDocument.movementCategoryId,

      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.bankAccountId,
      movementStatusId: dataDocument.movementStatusId,

      paymentDate: dataDocument.registeredAt,

      idFirebase: '',
      documentUrl: '',
      documentName: '',
    })

    return { message: "Documento y movimientos creados correctamente" };
  }

  async updataAccountabilityData(documentData: any) {

    const accountabilityData = await this.findOne(documentData.accountabilityId);

    let documentList = await this.prisma.zentraDocument.findMany({
      where: {
        deletedAt: null,
        accountabilityId: documentData.accountabilityId,
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
      if (item.documentCategoryId === DOCUMENT_CATEGORY.RENDICION_CUENTA) {
        totalAccountedAmount += Number(item.paidAmount)
      }
      if (item.documentCategoryId === DOCUMENT_CATEGORY.CLASICO && item.documentTypeId === DOCUMENT_TYPE.REEMBOLSO) {
        totalApprovedAmount += Number(item.paidAmount)
      }
    }

    let stateAccountability = ACCOUNTABILITY_STATUS.RENDICION_PENDIENTE

    if (totalAccountedAmount === totalApprovedAmount && totalAccountedAmount > 0 && totalApprovedAmount > 0) {
      if (accountabilityData?.id) {
        await this.mailService.notifyExpenseReportPendingAccounting(accountabilityData)
      } 
      stateAccountability = ACCOUNTABILITY_STATUS.VALIDACION_CONTABLE_PENDIENTE
    }

    if (totalAccountedAmount > totalApprovedAmount && totalAccountedAmount > 0 && totalApprovedAmount > 0) {
      stateAccountability = ACCOUNTABILITY_STATUS.LIQUIDADO_PARCIAL
    }

    return this.updateSimple(accountabilityData?.id + '', {
      accountedAmount: totalAccountedAmount,
      approvedAmount: totalApprovedAmount,
      requestedAmount: totalRequestedAmount,
      accountabilityStatusId: stateAccountability,
    });

  }

  // Report

  async getAllDataReport(accountabilityId: string) {
    return this.prisma.zentraDocument.findMany({
      where: {
        deletedAt: null,
        accountabilityId,
      },
      select: {
        documentCategoryId: true,
        documentType: true,
        paidAmount: true,
        amountToPay: true,
        code: true,
        description: true,
        transactionTypeId: true,
        party: {
          select: {
            name: true,
            partyDocuments: {
              where: {
                deletedAt: null,
                documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL
              },
              select: {
                document: true
              }
            }
          }
        },
        budgetItem: {
          select: {
            definition: {
              select: {
                name: true,
                category: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        currencyId: true,
        user: {
          select: {
            area: {
              select: {
                name: true
              }
            },
            firstName: true,
            lastName: true
          }
        },
        documentStatus: {
          select: {
            name: true
          }
        },
        registeredAt: true,
        files: {
          where: {
            deletedAt: null,
          }
        },
        movements: {
          select: {
            code: true,
            description: true,
            amount: true,
            transactionType: true,
            budgetItemId: true,
            paymentDate: true,
            documentUrl: true,
            documentName: true,
            fromTelecredito: true,
            files: {
              where: {
                deletedAt: null,
              }
            }
          },
          where: {
            deletedAt: null,
          }
        }
      }
    });
  }


}