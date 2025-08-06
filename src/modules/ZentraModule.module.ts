import { Module } from '@nestjs/common';

import { ZentraAuthModule } from '../auth/zentra/zentra-auth.module';
import { ZentraUsersModule } from './zentra/zentra-config/zentra-users/zentra-users.module';
import { ZentraPageModule } from './zentra/zentra-config/zentra-page/zentra-page.module';
import { ZentraPageGroupModule } from './zentra/zentra-config/zentra-page-group/zentra-page-group.module';
import { ZentraRoleModule } from './zentra/zentra-config/zentra-role/zentra-role.module';
import { ZentraRolePermissionModule } from './zentra/zentra-config/zentra-role-permission/zentra-role-permission.module';

// Zentra Masters

import { ZentraBankModule } from './zentra/zentra-master/zentra-bank/zentra-bank.module';
import { ZentraCurrencyModule } from './zentra/zentra-master/zentra-currency/zentra-currency.module';
import { ZentraDocumentTypeModule } from './zentra/zentra-master/zentra-document-type/zentra-document-type.module';
import { ZentraMovementCategoryModule } from './zentra/zentra-master/zentra-movement-category/zentra-movement-category.module';
import { ZentraProjectModule } from './zentra/zentra-master/zentra-project/zentra-project.module';
import { ZentraTransactionTypeModule } from './zentra/zentra-master/zentra-transaction-type/zentra-transaction-type.module';
import { ZentraCompanyModule } from './zentra/zentra-master/zentra-company/zentra-company.module';
import { ZentraPartyModule } from './zentra/zentra-master/zentra-party/zentra-party.module';
import { ZentraPartyRoleModule } from './zentra/zentra-master/zentra-party-role/zentra-party-role.module';
import { ZentraBankAccountModule } from './zentra/zentra-master/zentra-bank-account/zentra-bank-account.module';
import { ZentraPartyBankAccountModule } from './zentra/zentra-master/zentra-party-bank-account/zentra-party-bank-account.module';


import { ZentraBudgetCategoryModule } from './zentra/zentra-master/zentra-budget-category/zentra-budget-category.module';
import { ZentraBudgetItemCategoryModule } from './zentra/zentra-master/zentra-budget-item-category/zentra-budget-item-category.module';
import { ZentraBudgetItemDefinitionModule } from './zentra/zentra-master/zentra-budget-item-definition/zentra-budget-item-definition.module';
import { ZentraBudgetItemModule } from './zentra/zentra-master/zentra-budget-item/zentra-budget-item.module';


// Zentra Transaction
import { ZentraDocumentModule } from './zentra/zentra-transaction/zentra-document/zentra-document.module';
import { ZentraMovementModule } from './zentra/zentra-transaction/zentra-movement/zentra-movement.module';


@Module({
  imports: [
    ZentraAuthModule,
    ZentraUsersModule,
    ZentraPageModule,
    ZentraPageGroupModule,
    ZentraRoleModule,
    ZentraRolePermissionModule,

    ZentraBankModule,
    ZentraBudgetItemCategoryModule,
    ZentraCurrencyModule,
    ZentraDocumentTypeModule,
    ZentraMovementCategoryModule,
    ZentraProjectModule,
    ZentraTransactionTypeModule,
    ZentraCompanyModule,
    ZentraPartyModule,
    ZentraPartyRoleModule,
    ZentraBankAccountModule,

    ZentraBudgetCategoryModule,
    ZentraBudgetItemModule,
    ZentraPartyBankAccountModule,
    ZentraBudgetItemDefinitionModule,


    ZentraDocumentModule,
    ZentraMovementModule



  ],  
})
export class ZentraMainModule {}