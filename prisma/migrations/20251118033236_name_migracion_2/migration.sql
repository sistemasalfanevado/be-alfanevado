-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "zentraAccountabilityId" TEXT;

-- CreateTable
CREATE TABLE "zentra_accountability" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "paidAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "partyId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "documentTypeId" TEXT NOT NULL,
    "accountabilityStatusId" TEXT NOT NULL,
    "transactionTypeId" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_accountability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_zentraAccountabilityId_fkey" FOREIGN KEY ("zentraAccountabilityId") REFERENCES "zentra_accountability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_accountability" ADD CONSTRAINT "zentra_accountability_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_accountability" ADD CONSTRAINT "zentra_accountability_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_accountability" ADD CONSTRAINT "zentra_accountability_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "zentra_document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_accountability" ADD CONSTRAINT "zentra_accountability_accountabilityStatusId_fkey" FOREIGN KEY ("accountabilityStatusId") REFERENCES "zentra_accountability_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_accountability" ADD CONSTRAINT "zentra_accountability_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "zentra_transaction_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_accountability" ADD CONSTRAINT "zentra_accountability_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_accountability" ADD CONSTRAINT "zentra_accountability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
