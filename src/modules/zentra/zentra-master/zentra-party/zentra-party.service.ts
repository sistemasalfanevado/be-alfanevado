import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyDto } from './dto/create-zentra-party.dto';
import { UpdateZentraPartyDto } from './dto/update-zentra-party.dto';

import { BANK_ACCOUNT_HIERARCHY, PARTY_DOCUMENT_HIERARCHY } from 'src/shared/constants/app.constants';


@Injectable()
export class ZentraPartyService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraPartyDto: CreateZentraPartyDto) {
    const { partyRoleId, ...partyData } = createZentraPartyDto;

    const newParty = await this.prisma.zentraParty.create({
      data: {
        ...partyData,
        partyRole: {
          connect: { id: partyRoleId },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return newParty;
  }

  async findAll() {
    const results = await this.prisma.zentraParty.findMany({
      where: { deletedAt: null },
      include: {
        partyRole: true,
        _count: {
          select: { partyBankAccounts: true }
        }
      },
      orderBy: { name: 'asc' },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      document: item.document,
      email: item.email,
      phone: item.phone,
      address: item.address,

      partyRoleId: item.partyRole.id,
      completeName: `${item.name}`,
      idFirebase: item.idFirebase,


      bankAccountsCount: item._count.partyBankAccounts,
    }));
  }

  async findAllSimple() {
    const results = await this.prisma.zentraParty.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  }

  async findAllWithPrincipal() {
    const results = await this.prisma.zentraParty.findMany({
      where: { deletedAt: null },
      include: {
        partyRole: true,
        partyBankAccounts: {
          where: {
            hierarchyId: BANK_ACCOUNT_HIERARCHY.PRINCIPAL,
          },
          include: {
            type: true,
            bank: true,
          },
          take: 1, // solo la principal
        },
        partyDocuments: {
          where: {
            documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL,
          },
          include: {
            documentType: true,
          },
          take: 1, // solo el principal
        },
      },
      orderBy: { name: 'asc' },
    });

    return results.map((item) => {
      const principalDocument = item.partyDocuments[0];
      const principalBankAccount = item.partyBankAccounts[0];

      return {
        id: item.id,
        name: item.name,

        // Documento principal
        partyDocument: principalDocument?.document || null,
        partyDocumentType: principalDocument?.documentType?.name || null,

        email: item.email,
        phone: item.phone,
        address: item.address,
        completeName: `${item.name}`,
        document: item.document,
        idFirebase: item.idFirebase,

        // Cuenta bancaria principal
        bankAccountNumber: principalBankAccount?.account || null,
        bankAccountType: principalBankAccount?.type?.name || null,
        bankAccountCci: principalBankAccount?.cci || null,

        bankName: principalBankAccount ? principalBankAccount.bank.name : null,

        partyDocumentComplete: principalDocument
          ? `${principalDocument.documentType?.name || ''}: ${principalDocument.document}`
          : null,
        bankAccountComplete: principalBankAccount
          ? `${principalBankAccount.type?.name || ''}: ${principalBankAccount.account} (CCI: ${principalBankAccount.cci})`
          : null,
      };
    });
  }

  async findOneWithPrincipal(id: string) {
    const item = await this.prisma.zentraParty.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        partyRole: true,
        partyBankAccounts: {
          where: {
            hierarchyId: BANK_ACCOUNT_HIERARCHY.PRINCIPAL,
          },
          include: {
            type: true,
            bank: true,
          },
          take: 1,
        },
        partyDocuments: {
          where: {
            documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL,
          },
          include: {
            documentType: true,
          },
          take: 1,
        },
      },
    });

    if (!item) {
      throw new Error(`No se encontró la party con ID ${id}`);
    }

    const principalDocument = item.partyDocuments[0];
    const principalBankAccount = item.partyBankAccounts[0];

    return {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      completeName: `${item.name}`,
      document: item.document,
      idFirebase: item.idFirebase,
      
      partyDocument: principalDocument?.document || null,

      partyDocumentTypeName: principalDocument?.documentType?.name || null,
      partyDocumentTypeId: principalDocument?.documentType?.id || null,
      partyDocumentComplete: principalDocument
        ? `${principalDocument.documentType?.name || ''}: ${principalDocument.document}`
        : null,

      
      bankAccountTypeName: principalBankAccount?.type?.name || null,
      bankAccountTypeId: principalBankAccount?.type?.id || null,

      bankAccountNumber: principalBankAccount?.account || null,
      bankAccountCci: principalBankAccount?.cci || null,
      
      bankName: principalBankAccount ? principalBankAccount.bank.name : null,
      bankId: principalBankAccount ? principalBankAccount.bank.id : null,
      bankAccountComplete: principalBankAccount
        ? `${principalBankAccount.type?.name || ''}: ${principalBankAccount.account} (CCI: ${principalBankAccount.cci})`
        : null,
    };
  }


  async findOne(id: string) {
    return this.prisma.zentraParty.findUnique({
      where: { id, deletedAt: null },
      include: { partyRole: true }
    });
  }

  async update(id: string, updateZentraPartyDto: UpdateZentraPartyDto) {
    const { partyRoleId, ...updateData } = updateZentraPartyDto;
    const data: any = { ...updateData };

    if (partyRoleId) {
      data.partyRole = { connect: { id: partyRoleId } };
    }

    const updatedParty = await this.prisma.zentraParty.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
      },
    });

    return updatedParty;
  }

  async remove(id: string) {
    return this.prisma.zentraParty.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: string) {
    return this.prisma.zentraParty.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
}