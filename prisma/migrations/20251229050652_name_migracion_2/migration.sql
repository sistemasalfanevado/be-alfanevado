-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "pettyCashId" TEXT;

-- CreateTable
CREATE TABLE "zentra_petty_cash_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_petty_cash_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_petty_cash_accountability" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,
    "requestedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "approvedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "accountedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "partyId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "pettyCashStatusId" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_petty_cash_accountability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_pettyCashId_fkey" FOREIGN KEY ("pettyCashId") REFERENCES "zentra_petty_cash_accountability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_petty_cash_accountability" ADD CONSTRAINT "zentra_petty_cash_accountability_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_petty_cash_accountability" ADD CONSTRAINT "zentra_petty_cash_accountability_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_petty_cash_accountability" ADD CONSTRAINT "zentra_petty_cash_accountability_pettyCashStatusId_fkey" FOREIGN KEY ("pettyCashStatusId") REFERENCES "zentra_petty_cash_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_petty_cash_accountability" ADD CONSTRAINT "zentra_petty_cash_accountability_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_petty_cash_accountability" ADD CONSTRAINT "zentra_petty_cash_accountability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
