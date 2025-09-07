import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { ZentraMovementService } from '../zentra-movement/zentra-movement.service';
import { ZentraDocumentService } from '../zentra-document/zentra-document.service';

import { CURRENCY, DOCUMENT_STATUS, TRANSACTION_TYPE } from 'src/shared/constants/app.constants';

@Injectable()
export class ZentraDocumentExpenseService {

  constructor(
    private prisma: PrismaService,
    private zentraMovementService: ZentraMovementService,
    private zentraDocumentService: ZentraDocumentService,
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
      await this.zentraMovementService.findByDocument(documentData?.id);

    let paidAmountDocumentEntry = 0;
    let paidAmountDocumentExit = 0;
    let paidTotal = 0;

    // 🔹 Calcular monto pagado del documento
    for (const item of listMovementDocument) {

      if (item.transactionTypeId === TRANSACTION_TYPE.ENTRY) {
        paidAmountDocumentEntry += Number(
          documentData?.currencyId === CURRENCY.SOLES
            ? Math.abs(item.executedSoles)
            : Math.abs(item.executedDolares),
        );
      }

      if (item.transactionTypeId === TRANSACTION_TYPE.EXIT) {
        paidAmountDocumentExit += Number(
          documentData?.currencyId === CURRENCY.SOLES
            ? Math.abs(item.executedSoles)
            : Math.abs(item.executedDolares),
        );
      }
    }

    paidTotal = Math.abs(paidAmountDocumentEntry - paidAmountDocumentExit)
    let documentStatusId = DOCUMENT_STATUS.PENDIENTE;

    // 🔹 Evaluar estado del documento
    if (paidTotal >= Number(documentData?.totalAmount)) {
      documentStatusId = DOCUMENT_STATUS.PAGADO;
    } else if (
      paidTotal < Number(documentData?.totalAmount) &&
      paidTotal > 0
    ) {
      documentStatusId = DOCUMENT_STATUS.PENDIENTE;
    }
    
    // 🔹 Actualizar documento
    return await this.zentraDocumentService.updateDocumentExpense(documentId, {
      documentStatusId: documentStatusId,
      paidAmount: paidTotal,
      totalInflow: paidAmountDocumentEntry,
      totalOutflow: paidAmountDocumentExit
    });

    
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
    });
  }





}