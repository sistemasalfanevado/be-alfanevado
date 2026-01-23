import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyDto } from './dto/create-zentra-party.dto';
import { UpdateZentraPartyDto } from './dto/update-zentra-party.dto';

import { BANK_ACCOUNT_HIERARCHY, PARTY_DOCUMENT_HIERARCHY, PARTY_ROL } from 'src/shared/constants/app.constants';

import { ZentraPartyBankAccountService } from '../zentra-party-bank-account/zentra-party-bank-account.service';
import { ZentraPartyDocumentService } from '../zentra-party-document/zentra-party-document.service';

import * as moment from 'moment';

@Injectable()
export class ZentraPartyService {
  constructor(
    private prisma: PrismaService,
    private zentraPartyBankAccountService: ZentraPartyBankAccountService,
    private zentraPartyDocumentService: ZentraPartyDocumentService) {

  }

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


  async createComplex(dataParty: any) {

    const { partyRoleId } = dataParty;

    const validation = await this.zentraPartyDocumentService.validateUniqueness(dataParty.name,dataParty.document);

    if (!validation.success) return validation;

    const dataTempParty = {
      name: dataParty.name,
      document: dataParty.document,
      email: dataParty.email,
      phone: dataParty.phone,
      address: dataParty.address,
      idFirebase: '',
    }
    const newParty = await this.prisma.zentraParty.create({
      data: {
        ...dataTempParty,
        partyRole: {
          connect: { id: dataParty.partyRoleId },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });


    const isProveedor =
      partyRoleId === PARTY_ROL.PROVEEDOR ||
      partyRoleId === PARTY_ROL.CLIENTE_PROVEEDOR;

    if (isProveedor) {
      await this.zentraPartyBankAccountService.create({
        account: dataParty.account,
        cci: dataParty.cci,
        partyId: newParty.id,
        bankId: dataParty.bankId,
        currencyId: dataParty.currencyId,
        typeId: dataParty.bankAccountTypeId,
        hierarchyId: dataParty.bankAccountHierarchyId,
      });
    }

    await this.zentraPartyDocumentService.create({
      document: dataParty.document,
      observation: '',
      partyId: newParty.id,
      documentTypeId: dataParty.partyDocumentTypeId,
      documentHierarchyId: dataParty.documentHierarchyId
    })

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
      include: {
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

      return {
        id: item.id,
        name: (principalDocument ? principalDocument.document : '') + ' - ' + item.name,
        partyDocument: principalDocument ? principalDocument.document : '',

      }
    })

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
            currency: true
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

        partyRoleName: item?.partyRole.name || null,
        partyRoleId: item?.partyRole.id || null,



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
        bankAccountCurrency: principalBankAccount ? principalBankAccount.currency.name : null,

        partyDocumentComplete: principalDocument
          ? `${principalDocument.documentType?.name || ''}: ${principalDocument.document}`
          : null,
        bankAccountComplete: principalBankAccount
          ? `${principalBankAccount.type?.name || ''}: ${principalBankAccount.account} (CCI: ${principalBankAccount.cci})`
          : null,
      };
    });
  }

  async findAllWithPrincipalDeleted() {
    const results = await this.prisma.zentraParty.findMany({
      where: { },
      include: {
        partyRole: true,
        partyBankAccounts: {
          where: {
            hierarchyId: BANK_ACCOUNT_HIERARCHY.PRINCIPAL,
          },
          include: {
            type: true,
            bank: true,
            currency: true
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

        partyRoleName: item?.partyRole.name || null,
        partyRoleId: item?.partyRole.id || null,



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
        bankAccountCurrency: principalBankAccount ? principalBankAccount.currency.name : null,

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
    return this.prisma.$transaction(
      async (tx) => {

        const listPartyBankAccount = await tx.zentraPartyBankAccount.findMany({
          where: { partyId: id, deletedAt: null }
        });

        const listPartyDocument = await tx.zentraPartyDocument.findMany({
          where: { partyId: id, deletedAt: null }
        });

        for (const item of listPartyBankAccount) {
          await tx.zentraPartyBankAccount.update({
            where: { id: item.id },
            data: { deletedAt: new Date() }
          });
        }

        for (const item of listPartyDocument) {
          await tx.zentraPartyDocument.update({
            where: { id: item.id },
            data: { deletedAt: new Date() }
          });
        }

        return tx.zentraParty.update({
          where: { id },
          data: { deletedAt: new Date() }
        });
      },
      {
        timeout: 20000,
        maxWait: 15000,
      }
    );
  }

  async restore(id: string) {
    return this.prisma.zentraParty.update({
      where: { id },
      data: { deletedAt: null }
    });
  }



  async cleanPartiesWithoutDocuments(preview: boolean = true) {
    // 1. Identificar Partys sin documentos
    const partiesToDelete = await this.prisma.zentraParty.findMany({
      where: {
        deletedAt: null, // Solo parties activos
        documents: {
          none: {}, // Filtra por parties que NO tienen ningún documento asociado
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Solo preview
    if (preview) {
      return {
        preview: true,
        totalPartiesFound: partiesToDelete.length,
        partiesToErase: partiesToDelete,
        message: "Lista de ZentraParty que serán eliminados al ejecutar con preview: false.",
      };
    }

    // 2. Proceder a la eliminación si preview es false
    const partyIdsToDelete = partiesToDelete.map(p => p.id);
    const results: { id: string, name: string }[] = [];

    for (const partyId of partyIdsToDelete) {
      const removedParty = await this.remove(partyId);
      results.push({ id: removedParty.id, name: removedParty.name });
    }

    return {
      preview: false,
      message: "Limpieza de ZentraParty sin documentos completada correctamente.",
      totalPartiesCleaned: results.length,
      cleanedParties: results,
    };
  }


  async getPartyDocumentCountAndList(partyId: string) {
    const partyWithDocuments = await this.prisma.zentraParty.findUnique({
      where: {
        id: partyId,
        deletedAt: null,
      },
      select: {
        documents: {
          select: {
            id: true,
            code: true,
            description: true,
            amountToPay: true,
            documentDate: true,
            budgetItem: {
              select: {
                definition: {
                  select: {
                    name: true,
                    project: {
                      select: {
                        name: true
                      }
                    }
                  }
                },
              }
            }
          },
          where: {
            deletedAt: null,
          }
        },
        _count: {
          select: {
            documents: true,
          },
        },
      },
    });

    if (!partyWithDocuments) {
      throw new Error(`No se encontró el Party con ID ${partyId}`);
    }

    const documentCount = partyWithDocuments._count.documents;
    
    const documentList = partyWithDocuments.documents.map(doc => ({
      id: doc.id,
      code: doc.code,
      description: doc.description,
      amountToPay: Number(doc.amountToPay),
      documentDate: moment(doc.documentDate).format('DD/MM/YYYY'),
      budgetItemName: doc.budgetItem.definition.name,
      projectName: doc.budgetItem.definition.project.name
    }));

    return {
      partyId,
      totalDocuments: documentCount,
      documentList: documentList,
      listLimit: partyWithDocuments.documents.length < documentCount ? documentList.length : undefined, 
    };
  }
}

