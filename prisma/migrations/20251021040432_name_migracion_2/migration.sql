-- CreateTable
CREATE TABLE "zentra_telecredito_operation" (
    "id" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "telecreditoConfigId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "datePayment" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_telecredito_operation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_telecredito_operation" ADD CONSTRAINT "zentra_telecredito_operation_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "zentra_bank_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_telecredito_operation" ADD CONSTRAINT "zentra_telecredito_operation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "zentra_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_telecredito_operation" ADD CONSTRAINT "zentra_telecredito_operation_telecreditoConfigId_fkey" FOREIGN KEY ("telecreditoConfigId") REFERENCES "zentra_telecredito_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_telecredito_operation" ADD CONSTRAINT "zentra_telecredito_operation_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "zentra_telecredito_operation_state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
