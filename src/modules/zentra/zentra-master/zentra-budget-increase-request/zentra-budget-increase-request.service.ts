import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetIncreaseRequestDto } from './dto/create-zentra-budget-increase-request.dto';
import { UpdateZentraBudgetIncreaseRequestDto } from './dto/update-zentra-budget-increase-request.dto';

import * as moment from 'moment';

@Injectable()
export class ZentraBudgetIncreaseRequestService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraBudgetIncreaseRequestDto) {
    await this.prisma.zentraBudgetIncreaseRequest.create({
      data: createDto,
    });

    return { message: 'Registrado correctamente' };
  }

  async findAll() {
    
    const results = await this.prisma.zentraBudgetIncreaseRequest.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        registeredAt: 'desc',
      },
      include: {
        budgetItem: {
          include: {
            definition: true,
            currency: true,
          }
        },
        currency: true,
        user: true,
        status: true,
        party: true,
      },
    });
    
    return results.map((item) => {
      
      return {
        
        id: item.id,
        documentCurrency: item.currency.name,
        userName: `${item.user.firstName} ${item.user.lastName}`,
        statusName: item.status.name, 

        budgetItemId: item.budgetItem.id,
        budgetItemName: `${item.budgetItem.definition.name} - ${item.budgetItem.currency.name}`,
        
        registeredAt: moment(item.registeredAt).format('DD/MM/YYYY'),
        documentDescription: `${item.party.name} ${item.documentCode} ${item.documentDescription}`,
        
        requestedAmount: item.requestedAmount,
        availableAmount: item.availableAmount,
        extraNeeded: item.extraNeeded,

      };
    });




  }

  async findOne(id: string) {
    return this.prisma.zentraBudgetIncreaseRequest.findFirst({
      where: { id, deletedAt: null },
      include: {
        budgetItem: true,
        currency: true,
        user: true,
        status: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetIncreaseRequestDto) {
    return this.prisma.zentraBudgetIncreaseRequest.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBudgetIncreaseRequest.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetIncreaseRequest.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}