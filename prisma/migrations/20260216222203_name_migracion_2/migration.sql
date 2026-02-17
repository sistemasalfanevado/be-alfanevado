-- CreateTable
CREATE TABLE "zentra_movement_budget_config" (
    "id" TEXT NOT NULL,
    "movementCategoryId" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_movement_budget_config_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_movement_budget_config" ADD CONSTRAINT "zentra_movement_budget_config_movementCategoryId_fkey" FOREIGN KEY ("movementCategoryId") REFERENCES "zentra_movement_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement_budget_config" ADD CONSTRAINT "zentra_movement_budget_config_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
