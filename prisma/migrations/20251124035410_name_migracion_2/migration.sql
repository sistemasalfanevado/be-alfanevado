/*
  Warnings:

  - You are about to drop the column `financialImpactId` on the `zentra_movement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_movement" DROP CONSTRAINT "zentra_movement_financialImpactId_fkey";

-- AlterTable
ALTER TABLE "zentra_movement" DROP COLUMN "financialImpactId";
