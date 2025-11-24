import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { ZentraMovementService } from '../zentra-movement/zentra-movement.service';
import { ZentraDocumentService } from '../zentra-document/zentra-document.service';
import { ZentraAccountabilityService } from '../zentra-accountability/zentra-accountability.service';

import { CURRENCY, DOCUMENT_STATUS, TRANSACTION_TYPE, ACCOUNTABILITY_STATUS, DOCUMENT_ORIGIN, DOCUMENT_CATEGORY } from 'src/shared/constants/app.constants';

@Injectable()
export class ZentraDocumentSalesService {

  constructor(
    private prisma: PrismaService,
    private zentraMovementService: ZentraMovementService,
    private zentraDocumentService: ZentraDocumentService,
    private zentraAccountabilityService: ZentraAccountabilityService,
  ) { }



  async addMovement(data: any) {
    await this.createMovement({
      code: data.code,
      description: data.description,
      documentId: data.documentId,
      amount: data.amount,
      transactionTypeId: data.transactionTypeId,
      movementCategoryId: data.movementCategoryId,
      budgetItemId: data.budgetItemId,
      bankAccountId: data.bankAccountId,
      movementStatusId: data.movementStatusId,
      date: data.paymentDate,
      idFirebase: !data.idFirebase ? '' : data.idFirebase,
      documentUrl: !data.documentUrl ? '' : data.documentUrl,
      documentName: !data.documentName ? '' : data.documentName,

    });
    return this.recalculateDocument(data.documentId);
  }

  async removeMovement(id: string) {
    const movementData = await this.zentraMovementService.findOne(id);

    await this.zentraMovementService.remove(id);

    if (!movementData || !movementData.id) {
      return;
    }

    return this.recalculateDocument(movementData.documentId);
  }

  async updateMovement(id: string, data: any) {
    await this.zentraMovementService.update(id, data);
    return this.recalculateDocument(data.documentId);
  }

  private async recalculateDocument(documentId: string) {

    const documentData = await this.zentraDocumentService.findOne(documentId);

    const listMovementDocument =
      await this.zentraMovementService.findByDocumentSimple(documentData?.id);

    let paidAmountDocumentEntry = 0;
    let paidAmountDocumentExit = 0;
    let paidTotal = 0;

    // 🔹 Calcular monto pagado del documento
    for (const item of listMovementDocument) {

      if (item.transactionTypeId === TRANSACTION_TYPE.ENTRY) {
        paidAmountDocumentEntry += Number(
          documentData?.currencyId === CURRENCY.SOLES
            ? Math.abs(Number(item.executedSoles))
            : Math.abs(Number(item.executedDolares)),
        );
      }

      if (item.transactionTypeId === TRANSACTION_TYPE.EXIT) {
        paidAmountDocumentExit += Number(
          documentData?.currencyId === CURRENCY.SOLES
            ? Math.abs(Number(item.executedSoles))
            : Math.abs(Number(item.executedDolares)),
        );
      }
    }

    paidTotal = Math.abs(paidAmountDocumentEntry - paidAmountDocumentExit)
    let documentStatusId = DOCUMENT_STATUS.PENDIENTE;

    // 🔹 Evaluar estado del documento
    if (paidTotal >= Number(documentData?.amountToPay)) {
      documentStatusId = DOCUMENT_STATUS.PAGADO;
    } else if (
      paidTotal < Number(documentData?.amountToPay) &&
      paidTotal > 0
    ) {
      documentStatusId = DOCUMENT_STATUS.PENDIENTE;
    }

    if (documentData?.documentOriginId === DOCUMENT_ORIGIN.RENDICION_CUENTAS) {
      // Si existe debo de actualizar la rendicion de cuentas

      await this.zentraDocumentService.updateDocumentSale(documentId, {
        documentStatusId: documentStatusId,
        paidAmount: paidTotal,
        totalInflow: paidAmountDocumentEntry,
        totalOutflow: paidAmountDocumentExit
      });

      const accountabilityData = await this.zentraAccountabilityService.findOne(documentData.accountabilityId);

      let documentList = await this.prisma.zentraDocument.findMany({
        where: {
          deletedAt: null,
          accountabilityId: documentData.accountabilityId,
        },
        select: {
          documentCategoryId: true,
          paidAmount: true,
        }
      });

      let totalRequestedAmount = 0;
      let totalPaidAmount = 0;

      for (let item of documentList) {
        if (item.documentCategoryId === DOCUMENT_CATEGORY.CLASICO) {
          totalRequestedAmount += Number(item.paidAmount)
        }
        if (item.documentCategoryId === DOCUMENT_CATEGORY.RENDICION_CUENTA) {
          totalPaidAmount += Number(item.paidAmount)
        }
      }

      let stateAccountability = ACCOUNTABILITY_STATUS.RENDICION_PENDIENTE

      if (totalRequestedAmount === totalPaidAmount && totalRequestedAmount > 0 && totalPaidAmount > 0) {
        stateAccountability = ACCOUNTABILITY_STATUS.VALIDACION_CONTABLE_PENDIENTE
      }

      await this.zentraAccountabilityService.updateSimple(accountabilityData?.id + '', {
        accountedAmount: totalPaidAmount,
        approvedAmount: totalRequestedAmount,
        accountabilityStatusId: stateAccountability,
      });


    }

    else {
      // 🔹 Actualizar documento
      return await this.zentraDocumentService.updateDocumentSale(documentId, {
        documentStatusId: documentStatusId,
        paidAmount: paidTotal,
        totalInflow: paidAmountDocumentEntry,
        totalOutflow: paidAmountDocumentExit
      });
    }


  }

  private async createMovement(data: {
    code: string;
    description: string;
    documentId: string;
    amount: number;
    transactionTypeId: string;
    movementCategoryId: string;
    budgetItemId: string;
    bankAccountId: string;
    movementStatusId: string;
    date: string;
    idFirebase: string,
    documentUrl: string,
    documentName: string,
  }) {
    return this.zentraMovementService.create({
      code: data.code,
      description: data.description,
      documentId: data.documentId,
      amount: data.amount,
      transactionTypeId: data.transactionTypeId,
      movementCategoryId: data.movementCategoryId,
      budgetItemId: data.budgetItemId,
      bankAccountId: data.bankAccountId,
      movementStatusId: data.movementStatusId,
      autorizeDate: data.date,
      generateDate: data.date,
      paymentDate: data.date,
      idFirebase: !data.idFirebase ? '' : data.idFirebase,
      documentUrl: !data.documentUrl ? '' : data.documentUrl,
      documentName: !data.documentName ? '' : data.documentName,
    });
  }





}