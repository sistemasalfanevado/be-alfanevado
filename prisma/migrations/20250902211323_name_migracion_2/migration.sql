/*
  Warnings:

  - You are about to drop the column `exchangeRateId` on the `zentra_document` table. All the data in the column will be lost.
  - You are about to drop the column `currencyId` on the `zentra_movement` table. All the data in the column will be lost.
  - Added the required column `executedAmount` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `executedDolares` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `executedSoles` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "zentra_document" DROP CONSTRAINT "zentra_document_exchangeRateId_fkey";

-- DropForeignKey
ALTER TABLE "zentra_movement" DROP CONSTRAINT "zentra_movement_currencyId_fkey";

-- AlterTable
ALTER TABLE "zentra_document" DROP COLUMN "exchangeRateId";

-- AlterTable
ALTER TABLE "zentra_movement" DROP COLUMN "currencyId",
ADD COLUMN     "executedAmount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "executedDolares" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "executedSoles" DECIMAL(12,2) NOT NULL;
