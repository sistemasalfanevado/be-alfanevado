import { Module } from '@nestjs/common';

import { ZentraAuthModule } from '../auth/zentra/zentra-auth.module';
import { ZentraUsersModule } from './zentra/zentra-config/zentra-users/zentra-users.module';
import { ZentraPageModule } from './zentra/zentra-config/zentra-page/zentra-page.module';
import { ZentraPageGroupModule } from './zentra/zentra-config/zentra-page-group/zentra-page-group.module';
import { ZentraRoleModule } from './zentra/zentra-config/zentra-role/zentra-role.module';
import { ZentraRolePermissionModule } from './zentra/zentra-config/zentra-role-permission/zentra-role-permission.module';
import { ZentraGenreModule } from './zentra/zentra-config/zentra-genre/zentra-genre.module';
import { ZentraActionModule } from './zentra/zentra-config/zentra-action/zentra-action.module';
import { ZentraRoleActionModule } from './zentra/zentra-config/zentra-role-action/zentra-role-action.module';
import { ZentraPasswordResetTokenModule } from './zentra/zentra-config/zentra-password-reset-token/zentra-password-reset-token.module';
import { ZentraTelecreditoConfigModule } from './zentra/zentra-config/zentra-telecredito-config/zentra-telecredito-config.module';
import { ZentraUserProjectModule } from './zentra/zentra-config/zentra-user-project/zentra-user-project.module';


// Zentra Masters
import { ZentraBankModule } from './zentra/zentra-master/zentra-bank/zentra-bank.module';
import { ZentraCurrencyModule } from './zentra/zentra-master/zentra-currency/zentra-currency.module';
import { ZentraDocumentTypeModule } from './zentra/zentra-master/zentra-document-type/zentra-document-type.module';
import { ZentraDocumentTransactionMethodModule } from './zentra/zentra-master/zentra-document-transaction-method/zentra-document-transaction-method.module';
import { ZentraMovementCategoryModule } from './zentra/zentra-master/zentra-movement-category/zentra-movement-category.module';
import { ZentraProjectModule } from './zentra/zentra-master/zentra-project/zentra-project.module';
import { ZentraSubProjectModule } from './zentra/zentra-master/zentra-sub-project/zentra-sub-project.module';
import { ZentraTransactionTypeModule } from './zentra/zentra-master/zentra-transaction-type/zentra-transaction-type.module';
import { ZentraCompanyModule } from './zentra/zentra-master/zentra-company/zentra-company.module';
import { ZentraPartyModule } from './zentra/zentra-master/zentra-party/zentra-party.module';
import { ZentraPartyRoleModule } from './zentra/zentra-master/zentra-party-role/zentra-party-role.module';
import { ZentraPartyBankAccountModule } from './zentra/zentra-master/zentra-party-bank-account/zentra-party-bank-account.module';
import { ZentraDocumentOriginModule } from './zentra/zentra-master/zentra-document-origin/zentra-document-origin.module';
import { ZentraFinancialImpactModule } from './zentra/zentra-master/zentra-financial-impact/zentra-financial-impact.module';
import { ZentraUserPartyModule } from './zentra/zentra-master/zentra-user-party/zentra-user-party.module';
import { ZentraAreaModule } from './zentra/zentra-master/zentra-area/zentra-area.module';
import { ZentraVisibilityModule } from './zentra/zentra-master/zentra-visibility/zentra-visibility.module';
import { ZentraStageModule } from './zentra/zentra-master/zentra-stage/zentra-stage.module';
import { ZentraSubStageModule } from './zentra/zentra-master/zentra-sub-stage/zentra-sub-stage.module';
import { ZentraSubStageProgressModule } from './zentra/zentra-master/zentra-sub-stage-progress/zentra-sub-stage-progress.module';
import { ZentraTransactionNatureModule } from './zentra/zentra-master/zentra-transaction-nature/zentra-transaction-nature.module';
import { ZentraNotificationRecipientModule } from './zentra/zentra-master/zentra-notification-recipient/zentra-notification-recipient.module';


import { ZentraPartyDocumentModule } from './zentra/zentra-master/zentra-party-document/zentra-party-document.module';
import { ZentraPartyDocumentHierarchyModule } from './zentra/zentra-master/zentra-party-document-hierarchy/zentra-party-document-hierarchy.module';
import { ZentraPartyDocumentTypeModule } from './zentra/zentra-master/zentra-party-document-type/zentra-party-document-type.module';

import { ZentraBankAccountModule } from './zentra/zentra-master/zentra-bank-account/zentra-bank-account.module';
import { ZentraBankAccountHierarchyModule } from './zentra/zentra-master/zentra-bank-account-hierarchy/zentra-bank-account-hierarchy.module';
import { ZentraBankAccountTypeModule } from './zentra/zentra-master/zentra-bank-account-type/zentra-bank-account-type.module';

import { ZentraBudgetCategoryModule } from './zentra/zentra-master/zentra-budget-category/zentra-budget-category.module';
import { ZentraBudgetItemCategoryModule } from './zentra/zentra-master/zentra-budget-item-category/zentra-budget-item-category.module';
import { ZentraBudgetItemDefinitionModule } from './zentra/zentra-master/zentra-budget-item-definition/zentra-budget-item-definition.module';
import { ZentraBudgetItemModule } from './zentra/zentra-master/zentra-budget-item/zentra-budget-item.module';
import { ZentraBudgetNatureModule } from './zentra/zentra-master/zentra-budget-nature/zentra-budget-nature.module';
import { ZentraBudgetItemHistoryModule } from './zentra/zentra-master/zentra-budget-item-history/zentra-budget-item-history.module';

import { ZentraDocumentStatusModule } from './zentra/zentra-master/zentra-document-status/zentra-document-status.module';
import { ZentraDocumentCategoryModule } from './zentra/zentra-master/zentra-document-category/zentra-document-category.module';
import { ZentraMovementStatusModule } from './zentra/zentra-master/zentra-movement-status/zentra-movement-status.module';
import { ZentraExchangeRateModule } from './zentra/zentra-master/zentra-exchange-rate/zentra-exchange-rate.module';
import { ZentraProjectIncomeModule } from './zentra/zentra-master/zentra-project-income/zentra-project-income.module';

import { ZentraTelecreditoOperationStateModule } from './zentra/zentra-master/zentra-telecredito-operation-state/zentra-telecredito-operation-state.module';


import { ZentraLandingPageRelationModule } from './zentra/zentra-master/zentra-landing-page-relation/zentra-landing-page-relation.module';
import { ZentraBrokerModule } from './zentra/zentra-master/zentra-broker/zentra-broker.module';
import { ZentraSaleTypeModule } from './zentra/zentra-master/zentra-sale-type/zentra-sale-type.module';

import { ZentraScheduledIncomeDocumentModule } from './zentra/zentra-master/zentra-scheduled-income-document/zentra-scheduled-income-document.module';
import { ZentraScheduledIncomeDocumentStatusModule } from './zentra/zentra-master/zentra-scheduled-income-document-status/zentra-scheduled-income-document-status.module';

import { ZentraScheduledDebtDocumentModule } from './zentra/zentra-master/zentra-scheduled-debt-document/zentra-scheduled-debt-document.module';


import { ZentraInstallmentStatusModule } from './zentra/zentra-master/zentra-installment-status/zentra-installment-status.module';
import { ZentraBankStatementModule } from './zentra/zentra-utils/zentra-bank-statement/zentra-bank-statement.module';
import { ZentraFinancialNatureModule } from './zentra/zentra-master/zentra-financial-nature/zentra-financial-nature.module';
import { ZentraBudgetIncreaseRequestModule } from './zentra/zentra-master/zentra-budget-increase-request/zentra-budget-increase-request.module';
import { ZentraBudgetIncreaseStatusModule } from './zentra/zentra-master/zentra-budget-increase-status/zentra-budget-increase-status.module';


// Zentra Transaction
import { ZentraDocumentModule } from './zentra/zentra-transaction/zentra-document/zentra-document.module';
import { ZentraInstallmentModule } from './zentra/zentra-transaction/zentra-installment/zentra-installment.module';
import { ZentraMovementModule } from './zentra/zentra-transaction/zentra-movement/zentra-movement.module';
import { ZentraMovementFileModule } from './zentra/zentra-transaction/zentra-movement-file/zentra-movement-file.module';
import { ZentraDebtInvestmentModule } from './zentra/zentra-transaction/zentra-debt-investment/zentra-debt-investment.module';
import { ZentraDocumentSalesModule } from './zentra/zentra-transaction/zentra-document-sales/zentra-document-sales.module';
import { ZentraDocumentExpenseModule } from './zentra/zentra-transaction/zentra-document-expense/zentra-document-expense.module';
import { ZentraDocumentFileModule } from './zentra/zentra-transaction/zentra-document-file/zentra-document-file.module';
import { ZentraInstallmentFileModule } from './zentra/zentra-transaction/zentra-installment-file/zentra-installment-file.module';

import { ZentraTransactionGeneralModule } from './zentra/zentra-transaction/zentra-transaction-general/zentra-transaction-general.module';
import { ZentraTelecreditoOperationModule } from './zentra/zentra-transaction/zentra-telecredito-operation/zentra-telecredito-operation.module';
import { ZentraTelecreditoOperationDetailModule } from './zentra/zentra-transaction/zentra-telecredito-operation-detail/zentra-telecredito-operation-detail.module';


// Zentra Ollama
import { ZentraOllamaModule } from './zentra/zentra-utils/zentra-ollama/zentra-ollama.module';

// Zentra Mail
import { MailModule } from '../mail/mail.module';


// Zentra Marketing
import { ZentraLandingLeadModule } from './zentra/zentra-mkt/zentra-landing-lead/zentra-landing-lead.module';


// Zentra Rendición de Cuentas
import { ZentraAccountabilityStatusModule } from './zentra/zentra-master/zentra-accountability-status/zentra-accountability-status.module';
import { ZentraAccountabilityModule } from './zentra/zentra-transaction/zentra-accountability/zentra-accountability.module';



@Module({
  imports: [
    ZentraAuthModule,
    ZentraUsersModule,
    ZentraPageModule,
    ZentraPageGroupModule,
    ZentraRoleModule,
    ZentraRolePermissionModule,
    ZentraGenreModule,
    ZentraActionModule,
    ZentraRoleActionModule,
    ZentraPasswordResetTokenModule,
    ZentraTelecreditoConfigModule,
    ZentraUserProjectModule,
    ZentraDocumentOriginModule,
    ZentraFinancialImpactModule,
    ZentraUserPartyModule,
    ZentraTelecreditoOperationStateModule,
    ZentraAreaModule,
    ZentraVisibilityModule,
    ZentraStageModule,
    ZentraSubStageModule,
    ZentraSubStageProgressModule,
    ZentraTransactionNatureModule,
    ZentraNotificationRecipientModule,
    
    ZentraBankModule,
    ZentraBudgetItemCategoryModule,
    ZentraCurrencyModule,
    ZentraDocumentTypeModule,
    ZentraDocumentTransactionMethodModule,
    ZentraMovementCategoryModule,
    ZentraProjectModule,
    ZentraSubProjectModule,
    ZentraTransactionTypeModule,
    ZentraCompanyModule,
    ZentraPartyModule,
    ZentraPartyRoleModule,
    ZentraPartyDocumentModule,
    ZentraPartyDocumentHierarchyModule,
    ZentraPartyDocumentTypeModule,
    

    ZentraBankAccountModule,
    ZentraBankAccountHierarchyModule,
    ZentraBankAccountTypeModule,
    ZentraLandingPageRelationModule,

    ZentraBudgetCategoryModule,
    ZentraBudgetItemModule,
    ZentraPartyBankAccountModule,
    ZentraBudgetItemDefinitionModule,
    ZentraBudgetNatureModule,
    ZentraBudgetItemHistoryModule,
    
    ZentraExchangeRateModule,
    ZentraInstallmentStatusModule,
    ZentraFinancialNatureModule,

    ZentraBrokerModule,
    ZentraSaleTypeModule,
    ZentraScheduledIncomeDocumentModule,
    ZentraScheduledIncomeDocumentStatusModule,

    ZentraScheduledDebtDocumentModule,
    
    ZentraDocumentStatusModule,
    ZentraDocumentCategoryModule,
    ZentraMovementStatusModule,
    ZentraBudgetIncreaseRequestModule,
    ZentraBudgetIncreaseStatusModule,

    ZentraProjectIncomeModule,
    

    ZentraDocumentModule,
    ZentraDocumentFileModule,
    ZentraMovementModule,
    ZentraMovementFileModule,
    ZentraInstallmentModule,
    ZentraDebtInvestmentModule,
    ZentraDocumentSalesModule,
    ZentraDocumentExpenseModule,
    ZentraTransactionGeneralModule,
    ZentraTelecreditoOperationModule,
    ZentraTelecreditoOperationDetailModule,

    ZentraInstallmentFileModule,



    // Utils
    ZentraBankStatementModule,
    ZentraOllamaModule,
    MailModule,

    // Marketing
    ZentraLandingLeadModule,


    // Rendición de Cuentas
    ZentraAccountabilityStatusModule,
    ZentraAccountabilityModule

  ],  
})
export class ZentraMainModule {}