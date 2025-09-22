-- CreateTable
CREATE TABLE "zentra_project_income" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_project_income_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_project_income" ADD CONSTRAINT "zentra_project_income_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_project_income" ADD CONSTRAINT "zentra_project_income_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
