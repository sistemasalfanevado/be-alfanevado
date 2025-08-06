/*
  Warnings:

  - Added the required column `budgetCategoryId` to the `zentra_budget_item_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_budget_item_category" ADD COLUMN     "budgetCategoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "zentra_budget_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(250),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "idFirebase" VARCHAR(30) DEFAULT '',

    CONSTRAINT "zentra_budget_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_budget_item_category" ADD CONSTRAINT "zentra_budget_item_category_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "zentra_budget_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
