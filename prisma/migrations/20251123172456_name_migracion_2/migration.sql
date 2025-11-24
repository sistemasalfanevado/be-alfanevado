/*
  Warnings:

  - You are about to drop the column `amountToPay` on the `zentra_accountability` table. All the data in the column will be lost.
  - You are about to drop the column `paidAmount` on the `zentra_accountability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "zentra_accountability" DROP COLUMN "amountToPay",
DROP COLUMN "paidAmount",
ADD COLUMN     "accountedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "approvedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "requestedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00;
