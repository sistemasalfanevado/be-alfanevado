-- CreateTable
CREATE TABLE "zentra_budget_item_history" (
    "id" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "oldAmount" DECIMAL(12,2) NOT NULL,
    "newAmount" DECIMAL(12,2) NOT NULL,
    "percentageChange" DECIMAL(5,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idFirebase" VARCHAR(30) DEFAULT '',

    CONSTRAINT "zentra_budget_item_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_budget_item_history" ADD CONSTRAINT "zentra_budget_item_history_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_item_history" ADD CONSTRAINT "zentra_budget_item_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
