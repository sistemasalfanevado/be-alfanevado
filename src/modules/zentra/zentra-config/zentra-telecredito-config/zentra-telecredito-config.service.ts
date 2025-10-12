import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraTelecreditoConfigDto } from './dto/create-zentra-telecredito-config.dto';
import { UpdateZentraTelecreditoConfigDto } from './dto/update-zentra-telecredito-config.dto';

@Injectable()
export class ZentraTelecreditoConfigService {
  constructor(private prisma: PrismaService) { }

  // 🟢 Crear nueva configuración
  async create(createDto: CreateZentraTelecreditoConfigDto) {
    return this.prisma.zentraTelecreditoConfig.create({
      data: {
        companyId: createDto.companyId,
        bankAccountId: createDto.bankAccountId,
        clientCode: createDto.clientCode,
        payrollType: createDto.payrollType,
        recordType: createDto.recordType ?? 'C',
        accountType: createDto.accountType,
        accountNumber: createDto.accountNumber,
        reference: createDto.reference ?? null,
      },
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraTelecreditoConfig.findMany({
      where: { deletedAt: null },
      include: {
        company: true,
        bankAccount: {
          include: {
            bank: true,
            currency: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      companyId: item.company.id,
      companyName: item.company.name,

      bankAccountId: item.bankAccount?.id,
      
      bankName: item.bankAccount?.bank?.name || null,
      currencyName: item.bankAccount?.currency?.name || null,
      
      clientCode: item.clientCode,
      payrollType: item.payrollType,
      recordType: item.recordType,
      accountType: item.accountType,
      accountNumber: item.accountNumber,
      reference: item.reference,
    }));
  }


  // 🟢 Obtener una configuración específica
  async findOne(id: string) {
    return this.prisma.zentraTelecreditoConfig.findFirst({
      where: { id, deletedAt: null },
      include: {
        company: true,
      },
    });
  }

  // 🟡 Actualizar una configuración
  async update(id: string, updateDto: UpdateZentraTelecreditoConfigDto) {
    return this.prisma.zentraTelecreditoConfig.update({
      where: { id },
      data: updateDto,
    });
  }

  // 🔴 Eliminar (borrado lógico)
  async remove(id: string) {
    return this.prisma.zentraTelecreditoConfig.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // ♻️ Restaurar (quitar borrado lógico)
  async restore(id: string) {
    return this.prisma.zentraTelecreditoConfig.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}