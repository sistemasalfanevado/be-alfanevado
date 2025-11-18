import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraAccountabilityDto } from './dto/create-zentra-accountability.dto';
import { UpdateZentraAccountabilityDto } from './dto/update-zentra-accountability.dto';
import { ZentraDocumentService } from '../zentra-document/zentra-document.service';
import { DOCUMENT_CATEGORY, DOCUMENT_STATUS } from 'src/shared/constants/app.constants';

import * as moment from 'moment';

@Injectable()
export class ZentraAccountabilityService {
  
  constructor(private prisma: PrismaService, private zentraDocumentService: ZentraDocumentService) { }

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
      amountToPay: item.amountToPay,
      paidAmount: item.paidAmount,

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

  async create(createDto: CreateZentraAccountabilityDto) {

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

    const created = await  this.prisma.zentraAccountability.create({
      data: {
        ...createDto,
        code: newCode,
      },
      select: { id: true, code: true },
    });

    const document = await this.zentraDocumentService.createDocument(
      {
        code: newCode,
        description: createDto.description,
        totalAmount: createDto.amountToPay,
        taxAmount: 0,
        netAmount: 0,
        detractionRate: 0,
        detractionAmount: 0,
        amountToPay: createDto.amountToPay,
        paidAmount: 0,
        observation: '',
        idFirebase: '',
        hasMovements: false,

        registeredAt: new Date(createDto.registeredAt),
        documentDate: new Date(createDto.registeredAt),
        expireDate: new Date(createDto.registeredAt),

        documentStatusId: DOCUMENT_STATUS.PENDIENTE,
        transactionTypeId: createDto.transactionTypeId,
        documentTypeId: createDto.documentTypeId,
        partyId: createDto.partyId,
        budgetItemId: createDto.budgetItemId,
        currencyId: createDto.currencyId,
        userId: createDto.userId,
        documentCategoryId: DOCUMENT_CATEGORY.CLASICO,
        accountabilityId: created.id,
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
      include: {
        party: true,
        currency: true,
        documentType: true,
        accountabilityStatus: true,
        transactionType: true,
        budgetItem: true,
        user: true,
        documents: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraAccountabilityDto) {
    return this.prisma.zentraAccountability.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraAccountability.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraAccountability.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}