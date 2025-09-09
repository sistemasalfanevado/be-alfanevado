-- CreateTable
CREATE TABLE "zentra_budget_increase_request" (
    "id" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestedAmount" DECIMAL(12,2) NOT NULL,
    "availableAmount" DECIMAL(12,2) NOT NULL,
    "extraNeeded" DECIMAL(12,2) NOT NULL,
    "documentCode" VARCHAR(50) NOT NULL,
    "documentDescription" VARCHAR(255) NOT NULL,
    "statusId" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_budget_increase_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_budget_increase_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_budget_increase_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_budget_increase_request" ADD CONSTRAINT "zentra_budget_increase_request_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_increase_request" ADD CONSTRAINT "zentra_budget_increase_request_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_increase_request" ADD CONSTRAINT "zentra_budget_increase_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_increase_request" ADD CONSTRAINT "zentra_budget_increase_request_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "zentra_budget_increase_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
