import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraInstallmentDto } from './dto/create-zentra-installment.dto';
import { UpdateZentraInstallmentDto } from './dto/update-zentra-installment.dto';
import * as moment from 'moment';

import { ZentraMovementService } from '../../zentra-transaction/zentra-movement/zentra-movement.service';
import { ZentraDocumentService } from '../../zentra-transaction/zentra-document/zentra-document.service';

import { INSTALLMENT_STATUS, DOCUMENT_STATUS, CURRENCY } from 'src/shared/constants/app.constants';

@Injectable()
export class ZentraInstallmentService {

  constructor(
    private prisma: PrismaService,
    private zentraMovementService: ZentraMovementService,
    @Inject(forwardRef(() => ZentraDocumentService))
    private readonly zentraDocumentService: ZentraDocumentService,
  ) { }

  async create(createZentraInstallmentDto: CreateZentraInstallmentDto) {
    return this.prisma.zentraInstallment.create({
      data: createZentraInstallmentDto,
    });
  }

  async findAll() {
    const installments = await this.prisma.zentraInstallment.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: { letra: 'asc' },
      include: {
        installmentStatus: {
          select: { id: true, name: true },
        },
        currency: {
          select: { id: true, name: true },
        },
        scheduledIncomeDocument: {
          select: {
            id: true,
            documentId: true, // 👈 aquí obtienes el documentId
          },
        },
      },
    });

    return installments.map(i => ({
      id: i.id,
      letra: i.letra,
      capital: i.capital,
      interest: i.interest,
      totalAmount: i.totalAmount,
      extra: i.extra,
      dueDate: moment(i.dueDate).format('DD/MM/YYYY'),

      installmentStatusId: i.installmentStatus.id,
      installmentStatusName: i.installmentStatus.name,
      scheduledIncomeDocumentId: i.scheduledIncomeDocumentId,
      documentId: i.scheduledIncomeDocument?.documentId ?? null,

      paidAmount: i.paidAmount,
      description: i.description,

      currencyId: i.currency.id,
      currencyName: i.currency.name,
      idFirebase: !i.idFirebase ? '' : i.idFirebase
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraInstallment.findUnique({
      where: { id },
      include: {
        installmentStatus: true,
        scheduledIncomeDocument: true,
        currency: true
      },
    });
  }

  async update(id: string, updateZentraInstallmentDto: UpdateZentraInstallmentDto) {
    return this.prisma.zentraInstallment.update({
      where: { id },
      data: updateZentraInstallmentDto,
    });
  }

  async remove(id: string) {

    // Primero debes de remover todos los movimientos asignados a esta cuota
    const listMovementInstallment =
      await this.zentraMovementService.findByInstallment(id);

    for (let item of listMovementInstallment) {
      await this.zentraMovementService.remove(item.id)
    }

    await this.recalculateInstallmentAndDocument(id);

    return this.prisma.zentraInstallment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraInstallment.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findAllByScheduled(scheduledIncomeDocumentId: string) {
    const installments = await this.prisma.zentraInstallment.findMany({
      where: {
        scheduledIncomeDocumentId,
        deletedAt: null,
      },
      orderBy: { letra: 'asc' },
      include: {
        installmentStatus: {
          select: { id: true, name: true },
        },
        currency: {
          select: { id: true, name: true },
        },
        scheduledIncomeDocument: {
          select: {
            id: true,
            documentId: true, // 👈 aquí obtienes el documentId
          },
        },
      },
    });

    return installments.map(i => ({
      id: i.id,
      letra: i.letra,
      capital: i.capital,
      interest: i.interest,
      totalAmount: i.totalAmount,
      extra: i.extra,
      dueDate: moment(i.dueDate).format('DD/MM/YYYY'),
      installmentStatusId: i.installmentStatus.id,
      installmentStatusName: i.installmentStatus.name,
      scheduledIncomeDocumentId: i.scheduledIncomeDocumentId,
      paidAmount: i.paidAmount,
      description: i.description,

      currencyId: i.currency.id,
      currencyName: i.currency.name,
      documentId: i.scheduledIncomeDocument?.documentId ?? null,
    }));


  }

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
      installmentId: data.installmentId,
      idFirebase: !data.idFirebase ? '' : data.idFirebase,
    });

    return this.recalculateInstallmentAndDocument(data.installmentId);
  }

  async removeMovement(id: string) {
    const movementData = await this.zentraMovementService.findOne(id);
    const installmentData = movementData?.installment;

    await this.zentraMovementService.remove(id);

    if (!installmentData || !installmentData.id) {
      return;
    }

    return this.recalculateInstallmentAndDocument(installmentData.id);
  }

  async updateMovement(id: string, data: any) {
    await this.zentraMovementService.update(id, data);
    return this.recalculateInstallmentAndDocument(data.installmentId);
  }

  private async recalculateInstallmentAndDocument(installmentId: string) {
    const installmentData = await this.findOne(installmentId); 


    const listMovementInstallment =
      await this.zentraMovementService.findByInstallmentSimple(installmentId);

    const documentData = await this.zentraDocumentService.findOne(
      installmentData?.scheduledIncomeDocument.documentId + '',
    );
    const listMovementDocument =
      await this.zentraMovementService.findByDocumentSimple(documentData?.id);

    let paidAmountInstallment = 0;
    let paidAmountDocument = 0;
    let installmentStatusId = INSTALLMENT_STATUS.PENDIENTE;
    let documentStatusId = DOCUMENT_STATUS.PENDIENTE;

    // 🔹 Calcular monto pagado de la cuota
    for (const item of listMovementInstallment) {
      paidAmountInstallment += Number(
        installmentData?.currency.id === CURRENCY.SOLES
          ? item.executedSoles
          : item.executedDolares,
      );
    }

    // 🔹 Calcular monto pagado del documento
    for (const item of listMovementDocument) {
      paidAmountDocument += Number(
        documentData?.currencyId === CURRENCY.SOLES
          ? item.executedSoles
          : item.executedDolares,
      );
    }

    // 🔹 Evaluar estado de la cuota
    if (paidAmountInstallment >= Number(installmentData?.totalAmount)) {
      installmentStatusId = INSTALLMENT_STATUS.PAGADO;
    } else if (
      paidAmountInstallment < Number(installmentData?.totalAmount) &&
      paidAmountInstallment > 0
    ) {
      installmentStatusId = INSTALLMENT_STATUS.PARCIAL;
    }

    // 🔹 Evaluar estado del documento
    if (paidAmountDocument >= Number(documentData?.totalAmount)) {
      documentStatusId = DOCUMENT_STATUS.PAGADO;
    } else if (
      paidAmountDocument < Number(documentData?.totalAmount) &&
      paidAmountDocument > 0
    ) {
      documentStatusId = DOCUMENT_STATUS.PENDIENTE;
    }

    // 🔹 Actualizar documento
    await this.zentraDocumentService.updateStatusAndPaidAmount(documentData?.id, {
      paidAmount: paidAmountDocument,
      documentStatusId,
    });

    // 🔹 Actualizar cuota
    return this.prisma.zentraInstallment.update({
      where: { id: installmentId },
      data: {
        paidAmount: paidAmountInstallment,
        installmentStatusId,
      },
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
    installmentId: string;
    date: string;
    idFirebase: string;
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
      installmentId: data.installmentId,
      autorizeDate: data.date,
      generateDate: data.date,
      paymentDate: data.date,
      idFirebase: !data.idFirebase ? '' : data.idFirebase
    });
  }





}