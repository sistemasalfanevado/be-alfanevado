/*
  Warnings:

  - Made the column `natureId` on table `zentra_budget_item_definition` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "zentra_budget_item_definition" DROP CONSTRAINT "zentra_budget_item_definition_natureId_fkey";

-- AlterTable
ALTER TABLE "zentra_budget_item_definition" ALTER COLUMN "natureId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "zentra_budget_item_definition" ADD CONSTRAINT "zentra_budget_item_definition_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "zentra_budget_nature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
