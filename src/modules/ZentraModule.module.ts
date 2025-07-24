import { Module } from '@nestjs/common';

import { ZentraAuthModule } from '../auth/zentra/zentra-auth.module';
import { ZentraUsersModule } from './zentra/zentra-config/zentra-users/zentra-users.module';
import { ZentraPageModule } from './zentra/zentra-config/zentra-page/zentra-page.module';
import { ZentraPageGroupModule } from './zentra/zentra-config/zentra-page-group/zentra-page-group.module';
import { ZentraRoleModule } from './zentra/zentra-config/zentra-role/zentra-role.module';
import { ZentraRolePermissionModule } from './zentra/zentra-config/zentra-role-permission/zentra-role-permission.module';

// Zentra Masters

import { ZentraBankModule } from './zentra/zentra-master/zentra-bank/zentra-bank.module';
import { ZentraBudgetItemCategoryModule } from './zentra/zentra-master/zentra-budget-item-category/zentra-budget-item-category.module';
import { ZentraCurrencyModule } from './zentra/zentra-master/zentra-currency/zentra-currency.module';
import { ZentraDocumentTypeModule } from './zentra/zentra-master/zentra-document-type/zentra-document-type.module';
import { ZentraMovementCategoryModule } from './zentra/zentra-master/zentra-movement-category/zentra-movement-category.module';
import { ZentraProjectModule } from './zentra/zentra-master/zentra-project/zentra-project.module';
import { ZentraTransactionTypeModule } from './zentra/zentra-master/zentra-transaction-type/zentra-transaction-type.module';
import { ZentraCompanyModule } from './zentra/zentra-master/zentra-company/zentra-company.module';


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
    ZentraCompanyModule

  ],  
})
export class ZentraMainModule {}