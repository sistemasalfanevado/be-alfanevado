/*
  Warnings:

  - You are about to drop the column `exchanceRate` on the `zentra_movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "zentra_movement" DROP COLUMN "exchanceRate",
ADD COLUMN     "exchangeRate" DECIMAL(12,2) NOT NULL DEFAULT 1;
