/*
  Warnings:

  - Added the required column `registeredAt` to the `zentra_budget_item_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `zentra_budget_item_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_budget_item_history" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
