/*
  Warnings:

  - You are about to drop the column `projectId` on the `zentra_budget_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_budget_item" DROP CONSTRAINT "zentra_budget_item_projectId_fkey";

-- AlterTable
ALTER TABLE "zentra_budget_item" DROP COLUMN "projectId",
ADD COLUMN     "executedDolares" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "executedSoles" DECIMAL(12,2) NOT NULL DEFAULT 0.00;
